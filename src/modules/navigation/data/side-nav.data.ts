import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'CORE',
        items: ['ListQuan'],
    },
    {
        text: 'MANAGER',
        items: ['Customers'],
    },
    
];

export const sideNavItems: SideNavItems = {
    ListQuan: {
        icon: 'arrows-alt',
        text: 'Danh sách các quán',
        link: '/dashboard/quans',
    },
    Customers: {
        icon: 'user',
        text: 'Thông tin cá nhân',
        link: '/dashboard/user',
    },

};



export const sideNavSectionsI: SideNavSection[] = [
    {
        text: 'CORE',
        items: ['Dashboard'],
    },
    {
        text: 'MANAGER',
        items: ['Innkeeper', 'Thaydoidatsan'],
    },

];

export const sideNavItemsI: SideNavItems = {
    Dashboard: {
        icon: 'arrows-alt',
        text: 'Danh sách các quán đang hoạt động',
        link: '/innkeeper/quans',
    },
    Innkeeper: {
        icon: 'user',
        text: 'thông tin chủ quán',
        link: '/innkeeper/innkeeper',
    },
    Thaydoidatsan: {
        text: 'Thay đổi đặt sân',
        link: '/innkeeper/thaydoidatsan',
    },

};



export const sideNavSectionsA: SideNavSection[] = [
    {
        text: 'CORE',
        items: ['Dashboard'],
    },
    {
        text: 'MANAGER',
        items: ['Admin', "DoanhThuListQuan", "DoanhThuCuaAdminTheoNam","User","Innkeeper"],
    },

];

export const sideNavItemsA: SideNavItems = {
    Dashboard: {
        icon: 'arrows-alt',
        text: 'Danh sách các quán',
        link: '/admin/quans',
    },
    Admin: {
        // icon: 'user',
        text: 'Danh sách các quán chưa duyệt',
        link: '/admin/admin',
    },
    DoanhThuListQuan: {
        text: 'Doanh Thu của các quán và amin theo tháng',
        link: '/admin/doanhthulistquan',
    },
    DoanhThuCuaAdminTheoNam: {
        text: 'Doanh thu của các quán và Admin Theo Nam',
        link: '/admin/doanhthucuaadmintheonam'
    },
    User: {
        text:"Danh sách người dùng",
        link:"/admin/users"
    },
    Innkeeper: {
        text:"Danh sách các chủ quán",
        link:"/admin/innkeepers"
    }


    //doanhthucuaadmintheonam
};
