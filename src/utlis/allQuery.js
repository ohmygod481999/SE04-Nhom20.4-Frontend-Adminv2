import Common from './common'
import Configuration from './configuration'

// import common from './common'
const Queries = {
  getAllArticle: function () {
    Common.getDataGraphQl(
      `
        {
            articles(param:
            {   
                limit:1000,offset:0,order:"asc",
                sort:"asc",
                languageId:"${
                  Configuration.languageVi
                }",merchantId:"${Common.getCookie('merchantId')}"})
            {
            totalCount,
            items
            {   
                
                id,
                name,
                subDescription,
                images {
                    id,
                    path,
                    displayOrder,
                    isFeatured,
                },
                categories {
                    id,
                    name
                  }
                createdDate,
            }
                }
        }
        `
    ).then((data) => {
      return data
      // this.props.loadAllArticle(data.articles.items)
    })
  },
  getCategoryArticle: function () {
    // lay phan loai bai viet
    Common.getDataGraphQl(
      `
         {
             categories(param:
             {   type:2,
                 limit:1000,offset:0,order:"asc",
                 sort:"asc",
                 languageId:"${
                   Configuration.languageVi
                 }",merchantId:"${Common.getCookie('merchantId')}"})
             {
             totalCount,
             items
             {   
                 
                 id,
                 type,
                 name,
                 subDescription,
                 images {
                     id,
                     path,
                     displayOrder,
                     isFeatured,
                 },
                 createdDate,
             }
                 }
         }
         `
    ).then((data) => {
      return data
      //  this.props.loadCategoryArticle(data.categories.items)
    })
  },
  getCategoryProduct: function () {
    // lay phan loai san pham
    Common.getDataGraphQl(
      `
        {
            categories(param:
            {   type:3,
                limit:1000,offset:0,order:"asc",
                sort:"asc",
                languageId:"${
                  Configuration.languageVi
                }",merchantId:"${Common.getCookie('merchantId')}"})
            {
            totalCount,
            items
            {   
                
                id,
                type,
                name,
                subDescription,
                images {
                    id,
                    path,
                    displayOrder,
                    isFeatured,
                },
                createdDate,
            }
                }
        }
        `
    ).then((data) => {
      return data
      // this.props.loadCategoryProduct(data.categories.items)
    })
  },
  getCategoryUser: function () {
    // lay phan loai user
    Common.getDataGraphQl(
      `
        {
            categories(param:
            {   type:4,
                limit:1000,offset:0,order:"asc",
                sort:"asc",
                languageId:"${
                  Configuration.languageVi
                }",merchantId:"${Common.getCookie('merchantId')}"})
            {
            totalCount,
            items
            {   
                
                id,
                type,
                name,
                subDescription,
                images {
                    id,
                    path,
                    displayOrder,
                    isFeatured,
                },
                createdDate,
            }
                }
        }
        `
    ).then((data) => {
      return data
      // this.props.loadCategoryUser(data.categories.items)
    })
  },
  //get menu
  getCategoryMenu: function () {
    Common.getDataGraphQl(
      `
    {
        categories(param:
        {   type:256,
            limit:1000,offset:0,order:"asc",
            sort:"asc",
            languageId:"${
              Configuration.languageVi
            }",merchantId:"${Common.getCookie('merchantId')}"})
        {
        totalCount,
        items
        {   
            id,
            type,
            name,
            parentId,
            displayOrder,
            description,
            subDescription,
            images {
                id,
                path,
                displayOrder,
                isFeatured,
            },
            createdDate,
        }
            }
    }
    `
    ).then((data) => {
      return data
      // this.props.loadCategoryMenu(data.categories.items)
    })
  },
}
export default Queries
