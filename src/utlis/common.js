import axios from 'axios'
import $ from 'jquery'
import moment from 'moment'
import React from 'react'
import Swal from 'sweetalert2'
import { getEmailTemplate } from '../Services/EmailService'
import Configuration from './configuration'

const Common = {
  GUID_EMPTY: '00000000-0000-0000-0000-000000000000',
  getPaymentStatus(status) {
    if (
      (status & Configuration.statusPayment.SUCCESS) ==
      Configuration.statusPayment.SUCCESS
    ) {
      return <b className="text-success">Thành công</b>
    }

    if (
      (status & Configuration.statusPayment.FAIL) ==
      Configuration.statusPayment.FAIL
    ) {
      return <b className="text-danger">Thất bại</b>
    }

    if (
      (status & Configuration.statusPayment.TIMEOUT) ==
      Configuration.statusPayment.TIMEOUT
    ) {
      return <b className="text-danger">Timeout</b>
    }

    if (
      (status & Configuration.statusPayment.PROCESS) ==
      Configuration.statusPayment.PROCESS
    ) {
      return <b className="text-warning">Đang xử lý</b>
    }
    if (
      (status & Configuration.statusPayment.DEFAULT) ==
      Configuration.statusPayment.DEFAULT
    ) {
      return <b className="text-primary">Mới tạo</b>
    }
    return <b className="text-default">-</b>
  },
  languageString: {
    '838aef56-78bb-11e6-b5a6-00155d582814': 'vi-vn',
    '7c88bd96-6a9b-46c2-b57a-dc21ab3f87d0': 'ja-JP',
    '9801ff94-a210-495d-8dff-70459d0aee49': 'ko-KR',
    'b26d20b5-f86b-4f89-8fc6-72e8b7ff8934': 'km-KH',
    'e3509252-c42d-4ae5-9779-d4805a687a8e': 'en-US',
  },
  RGBToHex(r, g, b) {
    r = r.toString(16)
    g = g.toString(16)
    b = b.toString(16)

    if (r.length == 1) r = '0' + r
    if (g.length == 1) g = '0' + g
    if (b.length == 1) b = '0' + b

    return '#' + r + g + b
  },
  HSLToHex(h, s, l) {
    // Must be fractions of 1
    s /= 100
    l /= 100

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0
    if (0 <= h && h < 60) {
      r = c
      g = x
      b = 0
    } else if (60 <= h && h < 120) {
      r = x
      g = c
      b = 0
    } else if (120 <= h && h < 180) {
      r = 0
      g = c
      b = x
    } else if (180 <= h && h < 240) {
      r = 0
      g = x
      b = c
    } else if (240 <= h && h < 300) {
      r = x
      g = 0
      b = c
    } else if (300 <= h && h < 360) {
      r = c
      g = 0
      b = x
    }
    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)
    return this.RGBToHex(r, g, b)
    // return "rgb(" + r + "," + g + "," + b + ")";
  },
  typeOfLink(link) {
    switch (link.split('/')[2]) {
      case 'bai-viet':
        return 'article'
      case 'danh-sach-bai-viet':
        return 'category'
      case 'pages':
        return 'pages'
      case 'danh-sach-san-pham':
        return 'productList'
      case 'san-pham':
        return 'product'
      case 'su-kien':
        return 'event'
      default:
        return 'custom'
    }
  },
  getCurrentDate() {
    return this.formatDateTimeMoment(new Date())
  },
  printInvoice(idTemplate, merchantId, data) {
    return getEmailTemplate(idTemplate, merchantId).then((res) => {
      if (!res.emailtemplate) {
        Swal.fire('Lỗi', 'Vui lòng cài đặt email template', 'error')
      } else {
        const template = res.emailtemplate.template
        const tpl = $(template)
        const replaceInvoice = Common.replaceSectionTemp(
          tpl.find('#paymentdetails')[0],
          [
            {
              ...data,
              totalBeforeTax: 'n/a',
              vatAmount: 'n/a',
              grandTotal: data.grandTotal,
              vatRate: 'n/a',
              orderlines: data.order.orderLines.map((orderLine, i) => ({
                No: i + 1,
                Description: orderLine.targetName,
                Unit: '',
                Quantity: orderLine.quantity,
                Price: orderLine.price,
                total: orderLine.total,
              })),
              totalWord: Common.numberToWord.doc(parseInt(data.grandTotal)),
              userName: data.userName ? data.userName : '',
              userEmail: data.userEmail ? data.userEmail : '',
              userMobile: data.userMobile ? data.userMobile : '',
              companyName: data.companyName ? data.companyName : '',
              taxCode: data.taxCode ? data.taxCode : '',
              companyAddress: data.companyAddress ? data.companyAddress : '',
            },
          ]
        )
        tpl.find('#paymentdetails').html(replaceInvoice)
        Common.printElem(
          tpl.wrapAll('<div class="cc"></div>').closest('.cc').html()
        )
      }
    })
  },
  getRandomCode(length) {
    var result = ''
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result.toUpperCase()
  },
  allStatusToStatuses(allStatus) {
    const maxExponent = 20
    const result = []
    for (let i = 0; i <= maxExponent; i++) {
      const val = Math.pow(2, i)
      if ((allStatus & val) === val) result.push(val)
    }
    return result
  },
  createRelationObjectArray(items) {
    let relationObjectArray = []
    items.forEach(function (val, i) {
      if (!val) return
      relationObjectArray.push({
        Id: val,
        IsFeatured: true,
        DisplayOrder: i,
      })
    })
    return relationObjectArray
  },
  replaceTemplate(inputStringHtml, idSection, dataObject) {
    const tpl = $(inputStringHtml)
    const tplFind = tpl.find(`#${idSection}`)[0]
    if (!tplFind)
      throw new Error('Template đã chọn không đúng cấu trúc hợp đồng')
    // return Swal.fire(
    //     "Lỗi",
    //     "Template đã chọn không đúng cấu trúc hợp đồng",
    //     "error"
    // );
    const replaceHtml = Common.replaceSectionTemp(tplFind, [dataObject])
    tpl.find(`#${idSection}`).html(replaceHtml)
    return tpl
      .wrapAll('<div class="longdeptraivodichnhatvutru"></div>')
      .closest('.longdeptraivodichnhatvutru')
      .html()
  },
  printElem(elem) {
    var mywindow = window.open('', 'PRINT', 'height=3508,width=2480')
    mywindow.document.write(elem)
    mywindow.document.close() // necessary for IE >= 10
    mywindow.focus() // necessary for IE >= 10*/
    mywindow.print()
    mywindow.close()

    return true
  },
  numberToWord: (function () {
    var t = [
        'không',
        'một',
        'hai',
        'ba',
        'bốn',
        'năm',
        'sáu',
        'bảy',
        'tám',
        'chín',
      ],
      r = function (r, n) {
        var o = '',
          a = Math.floor(r / 10),
          e = r % 10
        return (
          a > 1
            ? ((o = ' ' + t[a] + ' mươi'), 1 == e && (o += ' mốt'))
            : 1 == a
            ? ((o = ' mười'), 1 == e && (o += ' một'))
            : n && e > 0 && (o = ' lẻ'),
          5 == e && a >= 1
            ? (o += ' lăm')
            : 4 == e && a >= 1
            ? (o += ' tư')
            : (e > 1 || (1 == e && 0 == a)) && (o += ' ' + t[e]),
          o
        )
      },
      n = function (n, o) {
        var a = '',
          e = Math.floor(n / 100),
          n = n % 100
        return (
          o || e > 0
            ? ((a = ' ' + t[e] + ' trăm'), (a += r(n, !0)))
            : (a = r(n, !1)),
          a
        )
      },
      o = function (t, r) {
        var o = '',
          a = Math.floor(t / 1e6),
          t = t % 1e6
        // eslint-disable-next-line no-unused-expressions
        a > 0 && ((o = n(a, r) + ' triệu'), (r = !0))
        var e = Math.floor(t / 1e3),
          t = t % 1e3
        return (
          e > 0 && ((o += n(e, r) + ' ngàn'), (r = !0)),
          t > 0 && (o += n(t, r)),
          o
        )
      }
    let ty
    return {
      doc: function (r) {
        if (0 == r) return t[0]
        var n = '',
          a = ''
        do
          // eslint-disable-next-line no-unused-expressions
          (ty = r % 1e9),
            (r = Math.floor(r / 1e9)),
            (n = r > 0 ? o(ty, !0) + a + n : o(ty, !1) + a + n),
            (a = ' tỷ')
        while (r > 0)
        return n.trim()
      },
    }
  })(),
  getData: function (config, params) {
    var tempArray = config.split('|')
    var index = ''
    var type = ''
    var option = {}

    switch (tempArray[0].toLowerCase()) {
      case 'user':
        index = 'users'
        type = 'user'
        option.includes = ['id', 'name', 'email', 'mobile']
        option.size = 10000
        break
      case 'address':
        index = 'eventaddresses'
        type = 'eventaddress'
        option.includes = ['id', 'name', 'latitude', 'longitude']
        option.size = 10000
        break
      case 'evoucher':
        index = 'evouchers'
        type = 'evoucher'
        option.includes = ['id', 'name']
        option.size = 10000
        break
      case 'promotion':
        index = 'promotions'
        type = 'promotion'
        option.includes = ['id', 'name']
        option.size = 10000
        break
      case 'article':
        index = 'articles'
        type = 'article2'
        option.includes = [
          'id',
          'name',
          'languageCode',
          'friendlyUrl',
          'subDescription',
          'images',
          'createdDate',
        ]
        option.size = Configuration.pageSizeArticles
        break
      case 'event':
        index = 'events'
        type = 'event'
        option.includes = [
          'id',
          'name',
          'languageCode',
          'startDateTime',
          'endDateTime',
          'friendlyUrl',
          'subDescription',
          'images',
          'createdDate',
        ]
        option.size = Configuration.pageSizeArticles
        break
      case 'language':
        index = 'languages'
        type = 'language'
        option.includes = ['id', 'name', 'isFeatured', 'imagePath']
        option.size = Configuration.pageSizeArticles
        break
      case 'product':
        index = 'products'
        type = 'product'
        option.includes = [
          'id',
          'name',
          'languageCode',
          'friendlyUrl',
          'price',
          'subDescription',
          'images',
          'displayOrder',
          'code',
        ]
        option.size = Configuration.pageSizeProducts
        break
      case 'form':
        index = 'forms'
        type = 'form'
        option.includes = ['id', 'name', 'description']
        option.size = Configuration.pageSizeProducts
        break
      case 'category':
        index = 'categories'
        type = 'category'
        option.includes = [] // ["id", 'name', 'images', 'createdDate', 'subDescription']
        break
      case 'shoppingcart':
        index = 'shoppingcarts'
        type = 'shoppingcart'
        option.includes = [] // ["id", 'name', 'images', 'createdDate', 'subDescription']
        break
      default:
        return
    }

    option.queries = []

    var arrayFunction = tempArray.slice(1)
    var tempValueParam = ''
    var tempNameParam = ''
    if (arrayFunction.length > 0) {
      $.each(arrayFunction, function (i, val) {
        var tempArray = val.split(':')
        var functionName = tempArray[0]
        if (val.split(':')[1] == undefined) return

        switch (functionName.toLowerCase()) {
          case 'includes':
            if (val.split(':')[1].trim() == '') {
              option.includes = []
            } else {
              option.includes = val.split(':')[1].split(',')
            }

            break
          case 'from':
            if (val.split(':')[1] == 'paging') {
              option.from = (Common.activePage - 1) * parseInt(option.size)
            } else {
              option.from = val.split(':')[1]
            }
            break
          case 'size':
            option.size = val.split(':')[1]
            break
          case 'from':
            option.from = val.split(':')[1]
            break
          case 'sort':
            var sort = {}
            sort[tempArray[1].trim()] = tempArray[2]
            option.sorts = [sort]
            break
          case 'param':
            if (tempArray[2] === 'url') {
              tempValueParam = params['paramId']
              //fix for duplicate ElasticSearch char "-"
              if (tempArray[1].trim() === 'id') {
                option.size = 1
              }
            } else if (tempArray[2] === 'friendlyUrl') {
              tempValueParam = params['friendlyUrl']
              //fix for duplicate ElasticSearch char "-"
              if (tempArray[1].trim() === 'friendlyUrl') {
                option.size = 1
              }
            } else if (tempArray[2] === 'parentId') {
              tempValueParam = params['paramId']
            } else if (tempArray[2].includes('parent')) {
              var objectName = tempArray[2].split('.')[1]
              if (Common.rootData[objectName].length > 0) {
                tempValueParam = Common.rootData[objectName].toString()
              } else {
                tempValueParam = '00000001-0001-0001-0001-000000000001'
              }
            } else if (tempArray[2] === 'preParamIds') {
              tempValueParam = Common.preParamIds
            } else if (tempArray[2].includes('localStorage')) {
              var test = tempArray[2].split('.')[1]
              tempValueParam = localStorage.getItem(tempArray[2].split('.')[1])
              console.log(tempValueParam)
            } else if (tempArray[2] === 'dataSection') {
              if (Common.tempDataSection.categoryIds != undefined) {
                tempValueParam = Common.tempDataSection.categoryIds
              } else {
                tempValueParam = '00000001-0001-0001-0001-000000000001'
              }
            } else if (tempArray[2].trim() == '') {
              tempValueParam = '00000001-0001-0001-0001-000000000001'
            } else if (tempArray[2].trim() == 'keyword') {
              tempValueParam = params['paramKeyword']
            } else if (
              tempArray[2].trim().includes('detaildata') &&
              Common.detailData != null
            ) {
              tempValueParam =
                Common.detailData.data[0][tempArray[2].split('.')[1]]
            } else {
              tempValueParam = tempArray[2]
              Common.preParamIds = tempValueParam
            }
            if (tempValueParam === '' || tempValueParam == undefined) break
            var match = {}
            match[tempArray[1].trim()] = tempValueParam
            tempNameParam = tempArray[1].trim()

            if (tempArray[2] === 'url' || tempArray[2] === 'friendlyUrl') {
              option.queries.push({
                match_phrase: match,
              })
            } else {
              option.queries.push({
                match: match,
              })
            }
            // console.log(option);
            break
          default:
            break
        }
      })
    }
    var returnData = null
    if (
      tempArray[0] === 'language' ||
      tempArray[0] == 'evoucher' ||
      tempArray[0] == 'promotion' ||
      tempArray[0] == 'form'
    ) {
      returnData = Common.queryLanguageData(index, type, option)
    } else {
      returnData = Common.queryData(index, type, option)
    }

    if (tempArray[0].toLowerCase() == 'product') {
      for (let index = 0; index < returnData.data.length; index++) {
        const element = returnData.data[index]
        if (element['discounts'] != undefined) {
          var tempPrice = this.buildPrice(
            element['discounts'],
            element['price']
          )

          if (tempPrice['oldPrice'] != undefined) {
            returnData.data[index]['price'] = tempPrice['price']
            returnData.data[index]['oldPrice'] = tempPrice['oldPrice']
            returnData.data[index]['percent'] = tempPrice['percent']
            returnData.data[index]['cash'] = tempPrice['cash']
          }
        }
      }
    }

    console.log(tempArray)

    if (
      tempNameParam != '' &&
      (tempNameParam == 'id' || tempNameParam == 'friendlyUrl') &&
      tempValueParam != ''
    ) {
      var returnDataSorted = []
      $.each(tempValueParam.split(','), function (i, val) {
        var tempReturn = returnData.data.find((e) => e.id === val)
        if (tempReturn != undefined) {
          returnDataSorted.push(tempReturn)
        } else {
          var tempReturnFriendlyUrl = returnData.data.find(
            (e) => e.friendlyUrl === val
          )
          if (tempReturnFriendlyUrl != undefined) {
            returnDataSorted.push(tempReturnFriendlyUrl)
          }
        }
      })
      if (
        returnDataSorted.length == 1 &&
        returnDataSorted[0].categories != undefined
      ) {
        Common.tempDataSection[
          'categoryIds'
        ] = returnDataSorted[0].categories.map((e) => e.id).toString()
        if (
          tempArray[0] === 'article' &&
          window.merchantType === 1024 &&
          returnDataSorted[0].categoryCustomerIds.length > 0
        ) {
          //Content merchant
          var flag = false
          returnDataSorted[0].categoryCustomerIds.forEach((element) => {
            if (window.userCategories.includes(element)) {
              flag = true
            }
          })
          if (!flag) {
            returnDataSorted[0].description = 'Bạn không có quyền đọc!'
          }
        }
      }

      return { data: returnDataSorted, total: returnData.total }
    } else {
      return returnData
    }
  },
  replaceSectionTemp: function (section, items, param) {
    var build = ''
    $.each(items, function (i, item) {
      var tempItemBuild = section.outerHTML
      var attr = $(tempItemBuild).attr('labo-if')
      if (typeof attr !== typeof undefined && attr !== false) {
        if (
          Common.executeExpression(
            item,
            $(tempItemBuild).attr('labo-if'),
            tempItemBuild,
            i
          ) === false
        ) {
          tempItemBuild = ''
        } else {
          var conditionSections = $(tempItemBuild).find('[labo-if]')
          if (conditionSections.length > 0) {
            $.each(conditionSections, function (index, val) {
              if (
                Common.executeExpression(
                  item,
                  $(val).attr('labo-if'),
                  val,
                  i
                ) === false
              ) {
                //temp.remove(val);
                tempItemBuild = tempItemBuild.replace(val.outerHTML, '')
              }
            })
          }
        }
      } else {
        var conditionSections = $(tempItemBuild).find('[labo-if]')
        if (conditionSections.length > 0) {
          $.each(conditionSections, function (index, val) {
            if (
              Common.executeExpression(item, $(val).attr('labo-if'), val, i) ===
              false
            ) {
              tempItemBuild = tempItemBuild.replace(val.outerHTML, '')
            }
          })
        }
      }

      var subSections = $(section).find('[repeat]')
      if (subSections.length > 0) {
        $.each(subSections, function (i, subSection) {
          if (item[$(subSection).attr('repeat')] === undefined) {
            var subParam = {}
            subParam['paramId'] = item.id
            //subParam["parent"] = item;
            var temp = Common.getData($(subSection).attr('repeat'), subParam)
            if (temp != undefined) {
              tempItemBuild = tempItemBuild.replace(
                subSection.outerHTML,
                Common.replaceSectionTemp(subSection, temp.data, subParam)
              )
            }
          } else {
            tempItemBuild = tempItemBuild.replace(
              subSection.outerHTML,
              Common.replaceSectionTemp(
                subSection,
                item[$(subSection).attr('repeat')]
              ),
              param
            )
          }
        })
      }

      var tempVariables = Common.findVariable(/{{\s*[^}]*}}/g, tempItemBuild)
      $.each(tempVariables, function (index, variable) {
        tempItemBuild = Common.replaceVariable(item, variable, tempItemBuild)
      })

      build += tempItemBuild
    })
    return build
  },

  replaceVariable: function (item, variable, build) {
    var tempArray = variable.slice(2, variable.length - 2).split('|')
    if (tempArray.length === 0) return 'invalid variable!'

    //Lấy dữ liệu theo tên.
    //ví dụ: item["name"] là object, item["images"] là array
    var nameVariable = tempArray[0]

    var subNameVariables = nameVariable.split('.')
    var tempData = ''
    if (subNameVariables.length > 1) {
      var tempSubData = item[subNameVariables[0]]
      if (Array.isArray(tempSubData)) {
        $.each(tempSubData, function (i, val) {
          tempData += val[subNameVariables[1]] + ' '
        })
      } else {
        try {
          tempData = tempSubData[subNameVariables[1]]
        } catch (error) {
          console.error(error)
        }
      }
    } else {
      tempData = item[nameVariable]
    }

    if (nameVariable === 'currentLink') {
      tempData = window.location.href
    } else if (nameVariable === 'currentHost') {
      tempData = window.location.hostname
    } else if (nameVariable === 'currentLanguageCode') {
      tempData = window.languageCode
    }

    //Lấy function filter dạng mảng.
    var arrayFunction = tempArray.slice(1)
    if (arrayFunction.length > 0) {
      $.each(arrayFunction, function (i, val) {
        var functionName = val.split(':')[0]
        switch (functionName.toLowerCase()) {
          case 'substring':
            var etc = ''
            if (val.split(':')[2] != undefined) etc = val.split(':')[2]
            if (val.split(':')[1] != undefined)
              tempData = Common.subStringWithLastSpace(
                tempData,
                parseInt(val.split(':')[1]),
                etc
              )
            break
          case 'rewrite':
            tempData = Common.rewriteUrl(tempData)
            break
          case 'uppercase':
            tempData = tempData.toUpperCase()
            break
          case 'lowercase':
            tempData = tempData.toLowerCase()
            break
          case 'formatdatetime':
            if (val.split(':')[1] != undefined) {
              tempData = Common.formatDateTime(tempData, val.split(':')[1])
            } else {
              tempData = Common.formatDateTime(tempData)
            }
            break
          case 'formatmoney':
            tempData = tempData.formatMoney(0, 3)
            break
          case 'getobjectbyindex':
            if (
              val.split(':')[1] != undefined &&
              Array.isArray(tempData) &&
              tempData.length >= parseInt(val.split(':')[1])
            ) {
              tempData = tempData.sort(function (a, b) {
                return a.displayOrder - b.displayOrder
              })[parseInt(val.split(':')[1])]
            } else {
              tempData = tempData.sort(function (a, b) {
                return a.displayOrder - b.displayOrder
              })[0]
            }
            break
          case 'getthumbnailbyindex':
            if (nameVariable != 'images') break
            var tempFilter = tempData.filter((e) => e.isFeatured == true)
            if (tempFilter.length > 0) {
              if (
                val.split(':')[1] != undefined &&
                tempFilter.length >= parseInt(val.split(':')[1])
              ) {
                tempData = tempFilter.sort(function (a, b) {
                  return a.displayOrder - b.displayOrder
                })[parseInt(val.split(':')[1])]
              } else {
                tempData = tempFilter.sort(function (a, b) {
                  return a.displayOrder - b.displayOrder
                })[0]
              }
            } else {
              tempData = null
            }
            break
          case 'getpath':
            if (nameVariable != 'images') break

            if (Array.isArray(tempData) || tempData == null) {
              tempData = Configuration.imageDefault
            } else {
              Common.staticUrlCurrent++
              if (Common.staticUrlCurrent >= Configuration.staticUrl.length) {
                Common.staticUrlCurrent = 0
              }

              tempData =
                Configuration.staticUrl[Common.staticUrlCurrent] +
                tempData['path']
              if (val.split(':')[1] != undefined) tempData += val.split(':')[1]
            }
            break

          case 'defaultvalue':
            if (tempData == undefined) {
              if (val.split(':')[1] != undefined) {
                tempData = val.split(':')[1]
              } else {
                tempData = ''
              }
            }

            break
          // case 'scr':
          //     if (val.split(':').length === 2) {
          //         tempData = Configuration.staticUrl[Common.staticUrlCurrent] + tempData + split(':')[1];
          //     } else {
          //         tempData = Configuration.staticUrl[Common.staticUrlCurrent] + tempData;
          //     }
          //     break;
          default:
            break
        }
      })
    }
    return build.replace(variable, tempData)
  },
  createImagesRelationObjectArray(images, thumbnailImages) {
    let relationImages = []
    thumbnailImages.forEach(function (val, i) {
      if (!val) return
      relationImages.push({
        Id: val.id,
        IsFeatured: true,
        DisplayOrder: i,
      })
    })

    const startIndexImage = relationImages.length

    images.forEach(function (val, i) {
      if (!val) return
      relationImages.push({
        Id: val.id,
        IsFeatured: false,
        DisplayOrder: i + startIndexImage,
      })
    })
    return relationImages
  },
  isTimeInrange(time, timeRangeStart, timeRangeEnd) {
    return (
      moment(time).isAfter(timeRangeStart) &&
      moment(time).isBefore(timeRangeEnd)
    )
  },
  formatDateTimeMoment(time) {
    return moment(time).format('YYYY-MM-DDTHH:mm:ss')
  },
  formatMoney(n, c, d, t) {
    var c = isNaN((c = Math.abs(c))) ? 2 : c,
      d = d == undefined ? ',' : d,
      t = t == undefined ? '.' : t,
      s = n < 0 ? '-' : '',
      i = parseInt((n = Math.abs(+n || 0).toFixed(c))) + '',
      j = (j = i.length) > 3 ? j % 3 : 0
    return (
      s +
      (j ? i.substr(0, j) + t : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) +
      (c
        ? d +
          Math.abs(n - i)
            .toFixed(c)
            .slice(2)
        : '') +
      'đ'
    )
  },
  formatNumber(n, c, d, t) {
    var c = isNaN((c = Math.abs(c))) ? 2 : c,
      d = d == undefined ? ',' : d,
      t = t == undefined ? '.' : t,
      s = n < 0 ? '-' : '',
      i = parseInt((n = Math.abs(+n || 0).toFixed(c))) + '',
      j = (j = i.length) > 3 ? j % 3 : 0
    return (
      s +
      (j ? i.substr(0, j) + t : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) +
      (c
        ? d +
          Math.abs(n - i)
            .toFixed(c)
            .slice(2)
        : '')
    )
  },
  array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1
      while (k--) {
        arr.push(undefined)
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
    return arr // for testing
  },
  range: (start, end) => {
    const length = end - start
    return Array.from({ length }, (_, i) => start + i)
  },
  removeComment(str) {
    return str.replace(/<\!--.*?-->/g, '')
  },
  checkValidHtmlString(str) {
    return /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/.test(str)
  },
  createCategory: function (body) {
    return this.sendCommand('Category', 'CreateCategory', {
      Id: this.guid(),
      ParentId: '00000000-0000-0000-0000-000000000000',
      DisplayOrder: 0,
      LanguageId: Configuration.languageVi,
      CreatedDate: Common.formatDateTime(new Date()),
      CreatedBy: Common.getCookie('userId'),
      Type: 2,
      MerchantId: Common.getCookie('merchantId'),
      SubDescription: '',
      Description: '',
      // ImageRelations: null,
      ...body,
    })
  },
  upperCaseKeyObject: function (arr) {
    for (var i = 0; i < arr.length; i++) {
      var a = arr[i]
      for (var key in a) {
        var temp
        if (a.hasOwnProperty(key)) {
          temp = a[key]
          delete a[key]
          a[key.charAt(0).toUpperCase() + key.substring(1)] = temp
        }
      }
      arr[i] = a
    }
    return arr
  },
  cropImage: function (imageUrl, width, height) {
    return imageUrl + `?Mode=Crop&width=${width}&height=${height}`
  },
  handleResponse: (response) => {
    const { Message, Success } = response.data

    if (!Success) throw new Error(Message)

    return Swal.fire({
      title: 'Thành công',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Đến trang danh sách',
      cancelButtonText: 'Ở lại',
}).then(({ value }) => ({
      success: value,
      res: response.data,
    }))
  },
  handleError: (err) => {
    Swal.fire({
      title: 'Thành công',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Đến trang danh sách',
      cancelButtonText: 'Ở lại',
})
  },
  getParameterByName: function (name, url) {
    if (!url) url = window.location.href
    name = name.replace(/[\[\]]/g, '\\$&')
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
  },
  sectionsType: [
    {
      name: 'Header',
      value: Math.pow(2, 0),
    },
    {
      name: 'Side Bar Left',
      value: Math.pow(2, 2),
    },
    {
      name: 'Side Bar Right',
      value: Math.pow(2, 4),
    },
    {
      name: 'Footer',
      value: Math.pow(2, 6),
    },
    {
      name: 'BodyHome',
      value: Math.pow(2, 8),
    },
    {
      name: 'BodyArticles',
      value: Math.pow(2, 10),
    },
    {
      name: 'BodyArticle',
      value: Math.pow(2, 12),
    },
    {
      name: 'BodyProducts',
      value: Math.pow(2, 14),
    },
    {
      name: 'BodyProduct',
      value: Math.pow(2, 16),
    },
    {
      name: 'BodyPage',
      value: Math.pow(2, 18),
    },
  ],
  categoryTypes: [
    {
      name: 'Địa chỉ',
      value: 1,
    },
    {
      name: 'Bài viết',
      value: 2,
    },
    {
      name: 'Sản phẩm',
      value: 3,
    },
    {
      name: 'Khách hàng',
      value: 4,
    },
    {
      name: 'Hạng',
      value: 8,
    },
    {
      name: 'Giỏ hàng',
      value: 10,
    },
    {
      name: 'Trang chủ',
      value: 32,
    },
    {
      name: 'Đơn hàng',
      value: 1024,
    },
    {
      name: 'Khối template',
      value: 128,
    },
    {
      name: 'Menu',
      value: 256,
    },
    {
      name: 'Tags',
      value: 32768,
    },
  ],
  getValuesInForm(obj, formData) {
    Object.keys(obj)
    var temp = {}
    $.each(Object.keys(obj), function (i, val) {
      temp[val] = formData.get(val)
    })
    return temp
  },

  formatDateTime(date, format) {
    var monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()
    var hour = d.getHours()
    var min = d.getMinutes()
    var sec = d.getSeconds()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day
    if (format == undefined) {
      return [month, day, year].join('-') + ' ' + hour + ':' + min + ':' + sec
    } else {
      switch (format) {
        case 'yyyy-mm-dd':
          return [year, month, day].join('-')

        case 'dd-mm-yyyy':
          return [day, month, year].join('-')

        case 'mm-dd-yyyy':
          return [month, day, year].join('-')

        case 'MM':
          return month
        case 'MMM':
          return monthNames[d.getMonth()]
        case 'DD':
          return day
        case 'YYYY':
          return year
        case 'mm':
          return min
        case 'ss':
          return sec
        case 'hh':
          return hour < 10 ? '0' + hour.toString() : hour
        case 'hh-mm-ss':
          return hour + ':' + min + ':' + sec
        default:
          return (
            [day, month, year].join('-') + ' ' + hour + ':' + min + ':' + sec
          )
      }
    }
  },
  checkIfLoggedIn: async function () {
    let tokenId = Common.getCookie(Configuration.userCookie)
    const url_api =
      Configuration.url_api + '/User/GetUserDataByToken?tokenId=' + tokenId
    const isLoggedIn = await axios.get(url_api).then((res) => {
      // var dataMerchant = JSON.parse(res.data.Message).MerchantCode;
      // Common.setCookie("merchantCode", dataMerchant);
      // console.log(res)
      return res.data.Success
    })

    if (!isLoggedIn) {
      window.location.replace('/')
    } else return
  },
  GetUserDataByToken: function (tokenId, cb) {
    const url_api =
      Configuration.url_api + `/User/GetUserDataByToken?tokenId=${tokenId}`
    axios.get(url_api).then((res) => {
      cb(res.data)
    })
  },
  getDataGraphQl(query) {
    return axios
      .post(Configuration.url_graphQl, { query: query })
      .then((res) => {
        return res.data.data
      })
  },
  sendAsyncCommand(
    stringCommandName,
    stringDomain,
    objData,
    functionSuccess,
    functionFail
  ) {
    let dataSend = {
      CommandName: stringCommandName,
      Domain: stringDomain,
      Content: JSON.stringify(objData),
      ModifiedBy: Common.getCookie('userId'),
      ModifiedDate: Common.formatDateTime(new Date()),
      TimeOutSecond: 10,
    }
    //window.showLoading();
    $.ajax({
      url: Configuration.url_api + '/Command/Send',
      type: 'post',
      contentType: 'application/json',
      processData: false,
      dataType: 'json',
      data: JSON.stringify(dataSend),
      success: function (res) {
        if (res.Success && functionSuccess !== undefined) {
          functionSuccess(res)
        } else {
          if (functionFail !== undefined) {
            functionFail(res)
          }
        }
        //window.hideLoading();
      },
      error: function (err) {
        if (functionFail !== undefined) {
          functionFail(err)
        }
        //window.hideLoading();
      },
    })
  },
  getDataById(domain, id, fields) {
    var query = `{
                ${domain}(param:{id: "${id}",languageId:"${
      Configuration.languageVi
    }", merchantId:"${Common.getCookie('merchantId')}"}){
                  ${fields}             
                }
              }`
    return axios
      .post(Configuration.url_graphQl, { query: query })
      .then((res) => {
        return res.data.data
      })
  },

  change_alias(alias) {
    if (alias == null) {
      return ''
    }
    var str = alias
    str = str.toLowerCase()
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    str = str.replace(/đ/g, 'd')
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      ' '
    )
    str = str.replace(/ + /g, ' ')
    str = str.trim()
    return str
  },
  rewriteUrl(string) {
    return Common.change_alias(string).replace(/\s/g, '-')
  },

  getRelationCategories(categories) {
    let relationCategories = []
    categories.forEach(function (val, i) {
      relationCategories.push({
        Id: val,
        IsFeatured: false,
        DisplayOrder: i,
      })
    })
    return relationCategories
  },

  sendCommand(domain, commandName, body) {
    const dataSend = {
      CommandName: commandName,
      Domain: domain,
      Content: JSON.stringify(body),
      TimeOutSecond: 7,
    }

    const api_url = Configuration.url_api + '/Command/SendSync'
    return axios.post(api_url, dataSend)
  },

  getConfigMerchant(id, options) {
    if (id === undefined) id = Common.getCookie('merchantId')
    return Common.getDataGraphQl(`
        {
            merchant(param:{id:"${id}"})
            {
              code,
              configuration,
              createdBy,
              createdDate
              ${
                options !== undefined && options.length > 0
                  ? options.join(',')
                  : ''
              }
            }
          }
        `)
  },

  // sendSyncCommand: function (dataAjax) {
  //     // Loading.show();
  //     var temp = {
  //         success: false,
  //         message: ""
  //     };
  //     $.ajax({
  //         url: Configuration.apiUrl + "/Command/SendSync",
  //         method: "POST",
  //         dataType: "json",
  //         data: JSON.stringify(dataAjax),
  //         contentType: "application/json",
  //         processData: false,
  //         async: false,
  //         beforeSend: function () { },
  //         complete: function () {
  //             // Loading.hide();
  //         },
  //         success(res) {
  //             if (res.Success) {
  //                 temp.success = true;
  //                 temp.message = res.Message;
  //             } else {
  //                 temp.success = false;
  //                 temp.message = res.Message;
  //             }
  //         },
  //         error() {
  //             temp.success = false;
  //             temp.message = "Lỗi request!";
  //         }
  //     });
  //     return temp;
  // },
  formatName: function (str, kyTu) {
    if (str.length < kyTu) {
      return str
    }
    str = str || ''
    var temp = str.substring(0, kyTu)
    temp = temp.substring(0, temp.lastIndexOf(' '))
    return temp + '...'
  },
  toTitleCase: function (string) {
    string = string
      .toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ')
    return string
  },

  getCookie: function (cname) {
    var name = cname + '='
    var decodedCookie = decodeURIComponent(document.cookie)
    var ca = decodedCookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  },

  setCookie: function (cname, cvalue, exdays) {
    exdays = exdays === undefined ? 1000000 : exdays
    var d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    var expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/;'
  },
  deleteCookie: function (cname) {
    document.cookie =
      cname + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  },
  isGuid(stringToTest) {
    if (stringToTest[0] === '{') {
      stringToTest = stringToTest.substring(1, stringToTest.length - 1)
    }
    var regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi
    return regexGuid.test(stringToTest)
  },

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    }
    return (
      s4() +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      s4() +
      s4()
    )
  },

  findVariable(myRegex, myString) {
    var match = myRegex.exec(myString)
    var variables = []
    while (match != null) {
      variables.push(match[0])
      match = myRegex.exec(myString)
    }
    return variables
  },
  queryData(index, type, option, handleData) {
    if (index != '') {
      index += '/'
    }

    if (type != '') {
      type += '/'
    }

    var clearDefaultQuery = false
    var returnData = []
    var from = 0
    var size = 10
    var queries = null
    var totalQuery = 0
    var queriesMustNot = null
    var sorts = null
    var async = false
    var languageId = this.getCookie(Configuration.tokenLanguage)
    var includes = ['id', 'name', 'description', 'subDescription', 'images']

    if (option != undefined) {
      if (option.from != undefined) {
        from = option.from
      }

      if (option.size != undefined) {
        size = option.size
      }
      if (option.includes != undefined) {
        includes = option.includes
      }

      if (option.queriesMustNot != undefined) {
        queriesMustNot = option.queriesMustNot
      }

      if (option.queries != undefined) {
        queries = option.queries
      }
      if (option.sorts != undefined) {
        sorts = option.sorts
      }

      if (option.async != undefined) {
        async = option.async
      }

      if (option.clearDefaultQuery != undefined) {
        clearDefaultQuery = option.clearDefaultQuery
      }
      if (option.languageId != undefined) {
        languageId = option.languageId
      }
    }
    var searchObject = {
      _source: {},
      query: {
        bool: {
          must: [
            {
              query_string: {
                default_field: 'merchantId',
                query: this.getCookie('merchantId'),
              },
            },
            {
              match: {
                languageId: languageId,
              },
            },
          ],
          must_not: [],
        },
      },
      sort: [],
    }
    searchObject._source.includes = includes

    if (clearDefaultQuery) {
      searchObject.query.bool.must = []
    }

    if (queries != null) {
      $.each(queries, function (i, val) {
        searchObject.query.bool.must.push(val)
      })
    }

    if (queriesMustNot != null) {
      $.each(queriesMustNot, function (i, val) {
        searchObject.query.bool.must_not.push(val)
      })
    }
    if (sorts != null) {
      $.each(sorts, function (i, val) {
        searchObject.sort.push(val)
      })
    }

    var xhr = new XMLHttpRequest()
    //Starts the variable xhr as the variable for the request
    xhr.open(
      'POST',
      'https://es.foodizzi.com/' +
        index +
        type +
        '_search?from=' +
        from +
        '&size=' +
        size +
        '',
      async
    )
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.setRequestHeader(
      'Authorization',
      'Basic ' + btoa('amara:dSPKMcdQkG5X97b')
    )
    //Runs method 'open' which defines the request

    //Sends the request
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var temp = JSON.parse(xhr.responseText)
          totalQuery = temp.hits.total
          $.each(temp.hits.hits, function (i, val) {
            returnData.push(val._source)
          })

          if (handleData != undefined) {
            handleData(returnData)
          }
        } else {
          console.error(xhr.statusText)
        }
      }
    }
    xhr.onerror = function (e) {
      console.error(xhr.statusText)
    }
    xhr.send(JSON.stringify(searchObject))
    return {
      data: returnData,
      total: totalQuery,
    }
  },

  sendSyncCommand(
    stringCommandName,
    stringDomain,
    objData,
    functionSuccess,
    functionFail
  ) {
    let dataSend = {
      CommandName: stringCommandName,
      Domain: stringDomain,
      Content: JSON.stringify(objData),
      ModifiedBy: Common.getCookie('userId'),
      ModifiedDate: Common.formatDateTime(new Date()),
      TimeOutSecond: 10,
    }
    $.ajax({
      url: Configuration.url_api + '/Command/SendSync',
      type: 'post',
      contentType: 'application/json',
      processData: false,
      dataType: 'json',
      data: JSON.stringify(dataSend),
      success: function (res) {
        if (res.Success && functionSuccess !== undefined) {
          functionSuccess()
        } else {
          if (functionFail !== undefined) {
            functionFail()
          }
        }
      },
      error: function (err) {
        if (functionFail !== undefined) {
          functionFail()
        }
      },
    })
  },
  queryDataMerchant: function (code) {
    var returnData = []
    var searchObject = {
      _source: {},
      query: {
        match: {
          code: {
            query: code,
          },
        },
      },
      sort: [],
    }

    var xhr = new XMLHttpRequest()
    //Starts the variable xhr as the variable for the request
    xhr.open(
      'POST',
      'https://es.foodizzi.com/merchants/merchant/_search?&size=1',
      false
    )
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.setRequestHeader(
      'Authorization',
      'Basic ' + btoa('amara:dSPKMcdQkG5X97b')
    )
    //Runs method 'open' which defines the request

    //Sends the request
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var temp = JSON.parse(xhr.responseText)
          $.each(temp.hits.hits, function (i, val) {
            returnData.push(val._source)
          })

          // if (handleData != undefined) {
          //     handleData(returnData);
          // }
        } else {
          console.error(xhr.statusText)
        }
      }
    }
    xhr.onerror = function (e) {
      console.error(xhr.statusText)
    }
    xhr.send(JSON.stringify(searchObject))
    console.log(returnData[0])
    return returnData[0]
  },
  sendDataPreview(selectorIframe, dataObj) {
    var iframeWin = document.getElementById(selectorIframe).contentWindow
    iframeWin.postMessage(dataObj, '*')
  },
  updateQuiz($selector, oldinfoQuiz, indexQuestion) {
    let arrayAnswer = []

    let typeQuestion = parseInt(
      $selector.find("[name='questionType'] :selected").val()
    )
    let pointQuestion = parseInt($selector.find("[name='grading']").val())
    let nameQuestion = $selector.find("[name='nameQuestion']").val()

    switch (typeQuestion) {
      case Math.pow(2, 0):
        $.each(
          $selector.find(".sectionAnswer input[type='radio']"),
          function (i, val) {
            if ($(this).prop('checked')) {
              arrayAnswer.push({
                id: Common.guid(),
                name: $(this).next().text(),
                isCorrect: true,
                displayOrder: i,
                images: [],
              })
            } else {
              arrayAnswer.push({
                id: Common.guid(),
                name: $(this).next().text(),
                isCorrect: false,
                displayOrder: i,
                images: [],
              })
            }
          }
        )
        break
      case Math.pow(2, 1):
        $.each(
          $selector.find('.sectionAnswer .answerMultiChoice'),
          function (i, val) {
            if ($(this).find("input[type='radio']").prop('checked')) {
              arrayAnswer.push({
                id: Common.guid(),
                name: $(this).find("input[type='text']").val(),
                isCorrect: true,
                displayOrder: i,
                images: [],
              })
            } else {
              arrayAnswer.push({
                id: Common.guid(),
                name: $(this).find("input[type='text']").val(),
                isCorrect: false,
                displayOrder: i,
                images: [],
              })
            }
          }
        )
        break
      case Math.pow(2, 2):
        $.each($selector.find('.answerMultiAnswer'), function (i, val) {
          var tempName = $(this).find("input[type='text']").val()
          console.log(tempName)
          if ($(this).find("input[type='checkbox']").prop('checked')) {
            arrayAnswer.push({
              id: Common.guid(),
              name: tempName,
              isCorrect: true,
              displayOrder: i,
              images: [],
            })
          } else {
            arrayAnswer.push({
              id: Common.guid(),
              name: tempName,
              isCorrect: false,
              displayOrder: i,
              images: [],
            })
          }
        })
        break
      case Math.pow(2, 3):
        arrayAnswer.push({
          id: Common.guid(),
          name: '',
          isCorrect: true,
          displayOrder: 0,
          images: [],
        })
        break
      case Math.pow(2, 4):
        let tempName = ''
        $.each($selector.find('.answerFib').find('*'), function (i, val) {
          let tempLength = $selector.find('.answerFib').find('*').length
          if ($(this)[0].tagName.toLowerCase() === 'span') {
            let tempValue = $(this).text().trim()
            tempName += tempValue
          } else {
            let tempValue = $(this).val().trim()
            tempName +=
              '_{{' + tempValue + '}}' + (i !== tempLength - 1 ? '_' : '')
          }
        })
        console.log(tempName)
        arrayAnswer.push({
          id: Common.guid(),
          name: tempName,
          isCorrect: true,
          displayOrder: 0,
          images: [],
        })
        break
      case Math.pow(2, 5):
        $.each(
          $selector.find('.sectionAnswer .answerMatching'),
          function (i, val) {
            let tempName = ''
            var tempLength = $(this).find("input[type='text']").length
            $.each($(this).find("input[type='text']"), function (i, val) {
              tempName += $(this).val() + (i !== tempLength - 1 ? '_' : '')
            })
            arrayAnswer.push({
              id: Common.guid(),
              name: tempName,
              isCorrect: true,
              displayOrder: i,
              images: [],
            })
          }
        )
        break

      default:
        break
    }
    let tempData = { ...oldinfoQuiz }
    let tempDataQuestion = tempData.questions[indexQuestion]

    tempDataQuestion.answers = arrayAnswer
    tempDataQuestion.name = nameQuestion
    tempDataQuestion.point = pointQuestion
    tempDataQuestion.type = typeQuestion

    return tempData
  },
  queryDataNotLanguage(index, type, option, handleData) {
    if (index != '') {
      index += '/'
    }

    if (type != '') {
      type += '/'
    }

    var clearDefaultQuery = false
    var returnData = []
    var from = 0
    var size = 10
    var queries = null
    var totalQuery = 0
    var queriesMustNot = null
    var sorts = null
    var async = false
    var languageId = this.getCookie(Configuration.tokenLanguage)
    var includes = ['id', 'name', 'description', 'subDescription', 'images']

    if (option != undefined) {
      if (option.from != undefined) {
        from = option.from
      }

      if (option.size != undefined) {
        size = option.size
      }
      if (option.includes != undefined) {
        includes = option.includes
      }

      if (option.queriesMustNot != undefined) {
        queriesMustNot = option.queriesMustNot
      }

      if (option.queries != undefined) {
        queries = option.queries
      }
      if (option.sorts != undefined) {
        sorts = option.sorts
      }

      if (option.async != undefined) {
        async = option.async
      }

      if (option.clearDefaultQuery != undefined) {
        clearDefaultQuery = option.clearDefaultQuery
      }
      if (option.languageId != undefined) {
        languageId = option.languageId
      }
    }
    var searchObject = {
      _source: {},
      query: {
        bool: {
          must: [
            {
              query_string: {
                default_field: 'merchantId',
                query: this.getCookie('merchantId'),
              },
            },
            // {
            //     match: {
            //         languageId: languageId
            //     }
            // }
          ],
          must_not: [],
        },
      },
      sort: [],
    }
    searchObject._source.includes = includes

    if (clearDefaultQuery) {
      searchObject.query.bool.must = []
    }

    if (queries != null) {
      $.each(queries, function (i, val) {
        searchObject.query.bool.must.push(val)
      })
    }

    if (queriesMustNot != null) {
      $.each(queriesMustNot, function (i, val) {
        searchObject.query.bool.must_not.push(val)
      })
    }
    if (sorts != null) {
      $.each(sorts, function (i, val) {
        searchObject.sort.push(val)
      })
    }

    var xhr = new XMLHttpRequest()
    //Starts the variable xhr as the variable for the request
    xhr.open(
      'POST',
      'https://es.foodizzi.com/' +
        index +
        type +
        '_search?from=' +
        from +
        '&size=' +
        size +
        '',
      async
    )
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.setRequestHeader(
      'Authorization',
      'Basic ' + btoa('amara:dSPKMcdQkG5X97b')
    )
    //Runs method 'open' which defines the request

    //Sends the request
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var temp = JSON.parse(xhr.responseText)
          totalQuery = temp.hits.total
          $.each(temp.hits.hits, function (i, val) {
            returnData.push(val._source)
          })

          if (handleData != undefined) {
            handleData(returnData)
          }
        } else {
          console.error(xhr.statusText)
        }
      }
    }
    xhr.onerror = function (e) {
      console.error(xhr.statusText)
    }
    xhr.send(JSON.stringify(searchObject))
    return {
      data: returnData,
      total: totalQuery,
    }
  },
  secondsToMinute(secs) {
    var sec_num = parseInt(secs, 10)
    var hours = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? '0' + v : v))
      .filter((v, i) => v !== '00' || i > 0)
      .join(':')
  },
  uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    )
  },
  isEmptyObj(obj) {
    return Object.keys(obj).length === 0
  },
}

export default Common
