import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

export default new Router({
    mode: "history",
    routes: [
         {
            path: '/',
            redirect: '/login'  // 此处已经被修改，原来为‘/dashboard’
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: 'dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/accountCard',
                    component:()=>import('../components/page/accountInfo/accountCard'),
                    meta: { title: '账号信息管理' }
                },
                {
                    path: '/projectmanager',
                    component:()=>import('../components/page/projectinformation/projectmanager'),
                    meta: { title: '账号信息管理' }
                },
                {
                    path: '/initializeProject',
                    component:()=>import('../components/page/projectinformation/initializeProject'),
                    meta: { title: '账号信息管理' }
                },
                {
                    path: '/addaccount',
                    component:()=>import('../components/page/accountInfo/addaccount'),
                    meta: { title: '增加账号' }
                },
                {
                    path: '/inquireaccount',
                    component:()=>import('../components/page/accountInfo/inquireaccount'),
                    meta: { title: '查询账号' }
                },
                {
                    path: '/changeaccount',
                    component:()=>import('../components/page/accountInfo/changeaccount'),
                    meta: { title: '修改账号' }
                },
                {
                    path: '/addProject',
                    component:()=>import('../components/page/projectInfo/addProject'),
                    meta: { title: '增加项目' }
                },
                {
                    path: '/inquireProject',
                    component:()=>import('../components/page/projectInfo/inquireProject'),
                    meta: { title: '查询项目' }
                },
                {
                    path: '/changeProject',
                    component:()=>import('../components/page/projectInfo/changeProject'),
                    meta: { title: '修改项目' }
                },
                {
                    path: '/projectCard',
                    component:()=>import('../components/page/projectInfo/projectCard'),
                    meta: { title: '项目信息' }
                },
                {
                    path: '/assginTask',
                    component:()=>import('../components/page/projectInfo/assginTask'),
                    meta: { title: '项目任务' }
                },
                {
                    path: '/addStaff',
                    component:()=>import('../components/page/StaffInfo/addStaff'),
                    meta: { title: '增加员工' }
                },
                {
                    path: '/inquireStaff',
                    component:()=>import('../components/page/StaffInfo/inquireStaff'),
                    meta: { title: '查询员工' }
                },
                {
                    path: '/changeStaff',
                    component:()=>import('../components/page/StaffInfo/changeStaff'),
                    meta: { title: '修改员工' }
                },
                {
                    path: '/StaffCard',
                    component:()=>import('../components/page/StaffInfo/StaffCard'),
                    meta: { title: '员工资料' }
                },
                {
                    path: '/addClient',
                    component:()=>import('../components/page/ClientInfo/addClient'),
                    meta: { title: '增加客户' }
                },
                {
                    path: '/inquireClient',
                    component:()=>import('../components/page/ClientInfo/inquireClient'),
                    meta: { title: '查询客户' }
                },
                {
                    path: '/changeClient',
                    component:()=>import('../components/page/ClientInfo/changeClient'),
                    meta: { title: '修改客户' }
                },
                {
                    path: '/ClientCard',
                    component:()=>import('../components/page/ClientInfo/ClientCard'),
                    meta: { title: '客户资料' }
                },
                {
                    path: '/taskManager',
                    component:()=>import('../components/page/taskInfo/taskManager'),
                    meta: { title: '任务中心' }
                },
                {
                    path: '/allottaskmanager',
                    component:()=>import('../components/page/taskInfo/allottaskmanager'),
                    meta: { title: '分配任务管理' }
                },
                {
                    path: '/createTable',
                    component:()=>import('../components/page/createTable'),
                    meta: { title: '生成报表' }
                },
                {
                    path: '/users',
                    component: () => import('../components/page/Users.vue'),
                    meta: { title: '用户账号管理' }
                },
                {
                    path: '/customer',
                    component: () => import('../components/page/Customer.vue'),
                    meta: { title: '客户信息管理' }
                },
                {
                    path: '/staff',
                    component: () => import('../components/page/Staff.vue'),
                    meta: { title: '员工信息管理' }
                },
                {
                    path: '/salary',
                    component: () => import('../components/page/Salary.vue'),
                    meta: { title: '员工工资管理' }
                },{
                    path: '/project',
                    component: () => import('../components/page/manager/Project.vue'),
                    meta: { title: '项目信息管理' }
                },{
                    path: '/addproject',
                    component: () => import('../components/page/manager/AddProject.vue'),
                    meta: { title: '项目信息提交' }
                },
                {
                    path:'/team',
                    component:() => import('../components/page/manager/Team.vue'),
                    meta:{title:'团队信息展示'}
                },
                
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: '消息中心' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                // {
                //     // 富文本编辑器组件
                //     path: '/editor',
                //     component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                //     meta: { title: '富文本编辑器' }
                // },
                // {
                //     // markdown组件
                //     path: '/markdown',
                //     component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                //     meta: { title: 'markdown编辑器' }
                // },
                // {
                //     // 图片上传组件
                //     path: '/upload',
                //     component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                //     meta: { title: '文件上传' }
                // },
                // {
                //     // vue-schart组件
                //     path: '/charts',
                //     component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                //     meta: { title: 'schart图表' }
                // },
                // {
                //     // 拖拽列表组件
                //     path: '/drag',
                //     component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                //     meta: { title: '拖拽列表' }
                // },
                // {
                //     // 拖拽Dialog组件
                //     path: '/dialog',
                //     component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                //     meta: { title: '拖拽弹框' }
                // },
                // {
                //     // 国际化组件
                //     path: '/i18n',
                //     component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                //     meta: { title: '国际化' }
                // },
                // {
                //     // 权限页面
                //     path: '/permission',
                //     component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                //     meta: { title: '权限测试', permission: true }
                // },
                // // 404页面原来在此处
                // {
                //     path: '/403',
                //     component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                //     meta: { title: '403' }
                // },
                // {
                //     path: '/donate',
                //     component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                //     meta: { title: '支持作者' }
                // }
            ]
        },
      
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path:'/forgot',
            component: () => import('../components/page/forgot.vue'),
            meta:{ title: '忘记密码' }
        },
        {
            path: '/register',
            component: () => import('../components/page/Register'),
            meta: { title: '注册账号'}
        },
        {
            path: '/*',
            component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
            meta: { title: '404' }
        }
    ]
});
