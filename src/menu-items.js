export default {
    items: [

        {
            id: 'pages',
            title: 'Pages',
            type: 'group',
            icon: 'icon-pages',
            children: [
                {
                    id: 'faculty',
                    title: 'Lịch thi',
                    type: 'item',
                    url: '/exam-schedule',
                    icon: 'feather icon-file-text',
                    role:"ALL"
                },
                {
                    id: 'logout',
                    title: 'Đăng xuất',
                    type: 'item',
                    url: '/logout',
                    classes: 'nav-item',
                    icon: 'feather icon-log-out',
                    role:"ALL"
                },

            ]
        }
    ]
}