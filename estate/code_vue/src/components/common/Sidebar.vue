<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items" >
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index" >
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-s-flag',
                    index: 'customer',
                    title: '账号管理',
                    subs:[
                        {
                            index: 'accountCard',
                            title: '账号信息'
                        },
                        {
                            index: 'addaccount',
                            title: '增加账号'
                        },
                        {
                            index: 'changeaccount',
                            title: '账号修改'
                        },
                        {
                            index: 'inquireaccount',
                            title: '账号查询'
                        },
                    ]
                },{
                    icon: 'el-icon-notebook-2',
                    index: 'project',
                    title: '项目管理',
                    subs:[
                        {
                            index: 'projectCard',
                            title: '项目信息'
                        },
                        {
                            index: 'addProject',
                            title: '增加项目'
                        },
                        {
                            index: 'changeProject',
                            title: '项目修改'
                        },
                        {
                            index: 'inquireProject',
                            title: '项目查询'
                        },
                        {
                            index: 'assginTask',
                            title: '项目任务'
                        },
                    ]
                },{
                    icon: 'el-icon-user-solid',
                    index: 'staff',
                    title: '员工管理',
                    subs:[
                        {
                            index: 'StaffCard',
                            title: '员工信息'
                        },
                        {
                            index: 'addStaff',
                            title: '增加员工'
                        },
                        {
                            index: 'changeStaff',
                            title: '员工修改'
                        },
                        {
                            index: 'inquireStaff',
                            title: '员工查询'
                        },
                    ]
                },
                {
                    icon: 'el-icon-user',
                    index: 'client',
                    title: '客户管理',
                    subs:[
                        {
                            index: 'ClientCard',
                            title: '客户信息'
                        },
                        {
                            index: 'addClient',
                            title: '增加客户'
                        },
                        {
                            index: 'changeClient',
                            title: '客户修改'
                        },
                        {
                            index: 'inquireClient',
                            title: '客户查询'
                        },
                    ]
                },
                 {
                    icon: 'el-icon-user',
                    index: 'taskManager',
                    title: '任务中心',
                },
                {
                    icon: 'el-icon-s-order',
                    index: 'createTable',
                    title: '生成报表',
                },
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        let trip = JSON.parse(localStorage.getItem('trip'));
        // console.log(typeof(trip))
        // console.log(this.items[2])
        if(trip===2)
        {
            this.items.splice(1,1);
            this.items.splice(3,1);
        }
        if(trip=== 3 ||trip=== 5||trip=== 7 )
        {
            // console.log(this.items)
            if(trip=== 5||trip=== 7){
                this.items[1].subs.splice(0,4);
            }
            this.items.splice(0,1);
            this.items.splice(1,2);
        }
        if(trip=== 4 ||trip=== 6||trip=== 8 )
        {
            this.items.splice(5,1)
            this.items.splice(0,4);
        }

        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
