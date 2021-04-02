/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { DefaultFooter, SettingDrawer } from '@ant-design/pro-layout'
import React, { useEffect } from 'react'
import { Link, useIntl, connect, history } from 'umi'
import { GithubOutlined } from '@ant-design/icons'
import { Result, Button } from 'antd'
import Authorized from '@/utils/Authorized'
// import RightContent from '@/components/GlobalHeader/RightContent';
import { getAuthorityFromRouter } from '@/utils/utils'
import logo from '../assets/logo.svg'

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
)

/**
 * use Authorized check all menu item
 */
const menuDataRender = (menuList) =>
  menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    }
    return Authorized.check(item.authority, localItem, null)
  })

const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} 蚂蚁金服体验技术部出品`}
    links={[
      {
        key: 'Ant Design Pro',
        title: 'Ant Design Pro',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/ant-design/ant-design-pro',
        blankTarget: true,
      },
      {
        key: 'Ant Design',
        title: 'Ant Design',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ]}
  />
)

const BasicLayout = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props
  /**
   * constructor
   */

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      })
    }
  }, [])
  /**
   * init variables
   */

  const handleMenuCollapse = (payload) => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      })
    }
  } // get children authority

  const authorized = getAuthorityFromRouter(
    props.route.routes,
    location.pathname || '/'
  ) || {
    authority: undefined,
  }
  const { formatMessage } = useIntl()
  return (
    <>
      <ProLayout
        logo={logo}
        formatMessage={formatMessage}
        onCollapse={handleMenuCollapse}
        onMenuHeaderClick={() => history.push('/')}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || !menuItemProps.path) {
            return defaultDom
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>
        }}
        breadcrumbRender={(routers = []) => [
          // {
          //   path: '/',
          //   breadcrumbName: formatMessage({
          //     id: 'menu.home',
          //   }),
          // },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          // console.log(
          //   'route',
          //   route,
          //   'params',
          //   params,
          //   'routes',
          //   routes,
          //   'paths=',
          //   paths
          // )
          // const last = routes.indexOf(route) === routes.length - 1
          // const middle = routes.indexOf(route) === routes.length - 2
          // const indexNum = routes.indexOf(route)
          // console.log(paths, '当前路径', paths.join('/'))
          // return last ? (
          //   <span>{route.breadcrumbName}</span>
          // ) : middle ? (
          //   <Link to={`./`}>{route.breadcrumbName}</Link>
          // ) : (
          //   <Link to={paths[0]}>{route.breadcrumbName}</Link>
          // )

          const last = routes.indexOf(route) == routes.length - 1
          let str = ''
          if (!last) {
            let arr = []
            for (
              let i = 0;
              i < routes.length - 1 - routes.indexOf(route);
              i++
            ) {
              arr.push('.')
            }
            str = arr.join('')
            console.log(str, 'jjjjjj')
          }

          return last ? (
            <span>{route.breadcrumbName}</span>
          ) : (
            // <Link to={`./${routeItem}`}>{route.breadcrumbName}</Link>
            <Link to={`${str}/`}>{route.breadcrumbName}</Link>
          )
        }}
        footerRender={() => defaultFooterDom}
        menuDataRender={menuDataRender}
        menuRender={false}
        // rightContentRender={() => <RightContent />}
        {...props}
        {...settings}
      >
        <Authorized authority={authorized.authority} noMatch={noMatch}>
          {children}
        </Authorized>
      </ProLayout>
      {/* <SettingDrawer
        settings={settings}
        onSettingChange={(config) =>
          dispatch({
            type: 'settings/changeSetting',
            payload: config,
          })
        }
      /> */}
    </>
  )
}

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout)
