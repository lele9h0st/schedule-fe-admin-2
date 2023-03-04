export default {
    items: [

        {
            id: 'pages',
            title: 'Pages',
            type: 'group',
            icon: 'icon-pages',
            children: [
                {
                    id: 'schedule',
                    title: 'Xem Lịch thi',
                    type: 'item',
                    url: '/schedule',
                    icon: 'feather icon-file-text',
                    role:"ALL"
                },
                {
                    id: 'generate',
                    title: 'Tạo lịch thi',
                    type: 'item',
                    url: '/generate-schedule',
                    icon: 'feather icon-file-text',
                    role:"ALL"
                },
                {
                    id: 'edit-schedule',
                    title: 'Điều chỉnh Lịch thi',
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