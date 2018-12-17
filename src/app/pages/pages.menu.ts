export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: '首页',
            icon: 'fa fa-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'sysmanager',
        data: {
          menu: {
            title: '系统管理',
            icon: 'fa fa-cog',
            selected: true,
            expanded: false,
            order: 1
          }
        },
        children: [
          {
            path: 'rolelist',
            data: {
              menu: {
                title: '角色管理',
              }
            }
          },
          {
            path: 'userlist',
            data: {
              menu: {
                title: '用户管理',
              }
            }
          },
          {
            path: 'enumeration',
            data: {
              menu: {
                title: '枚举管理',
              }
            }
          },
          {
            path: 'companymanage',
            data: {
              menu: {
                title: '公司维护',
              }
            }
          },
          {
            path: 'modulemanager',
            data: {
              menu: {
                title: '模块管理',
              }
            }
          }
        ]
      },
      {
        path: 'landedition',
        data: {
          menu: {
            title: '土地版管理',
            icon: 'fa fa-square',
            selected: false,
            expanded: false,
            order: 0
          }
        },
        children: [
          {
            path: 'landmaintain',
            data: {
              menu: {
                title: '土地维护',
              }
            }
          },
          {
            path: 'landmanagement',
            data: {
              menu: {
                title: '地块管理',
              }
            }
          },
          {
            path: 'userlist',
            data: {
              menu: {
                title: '用户管理',
              }
            }
          },
          {
            path: 'datamaintain',
            data: {
              menu: {
                title: '数据维护',
              }
            }
          }
        ]
      },
      // {
      //   path: 'chance',
      //   data: {
      //     menu: {
      //       title: '潜在机会',
      //       icon: 'fa fa-home',
      //       selected: false,
      //       expanded: false,
      //       order: 0
      //     }
      //   },
      //   children: [
      //     {
      //       path: 'storeland',
      //       data: {
      //         menu: {
      //           title: '储备地块分布规模',
      //         }
      //       }
      //     },
      //     {
      //       path: 'newstoreland',
      //       data: {
      //         menu: {
      //           title: '新储备地块位置',
      //         }
      //       }
      //     }
      //   ]
      // },
      // {
      //   path: 'cbdk',
      //   data: {
      //     menu: {
      //       title: '储备地块',
      //       icon: 'ion-android-home',
      //       selected: false,
      //       expanded: false,
      //       order: 0
      //     }
      //   },
      //   children: [
      //     {
      //       path: 'dkgl',
      //       data: {
      //         menu: {
      //           title: '地块管理',
      //         }
      //       }
      //     }
      //   ]
      // },
      // {
      //   path: 'gdjh',
      //   data: {
      //     menu: {
      //       title: '供地计划',
      //       icon: 'ion-android-home',
      //       selected: false,
      //       expanded: false,
      //       order: 0
      //     }
      //   }
      // },

      // {
      //   path: 'forms',
      //   data: {
      //     menu: {
      //       title: 'general.menu.form_elements',
      //       icon: 'ion-compose',
      //       selected: false,
      //       expanded: false,
      //       order: 400,
      //     }
      //   },
      //   children: [
      //     {
      //       path: 'inputs',
      //       data: {
      //         menu: {
      //           title: 'general.menu.form_inputs',
      //         }
      //       }
      //     },
      //     {
      //       path: 'layouts',
      //       data: {
      //         menu: {
      //           title: 'general.menu.form_layouts',
      //         }
      //       }
      //     }
      //   ]
      // }
    ]
  }
];
