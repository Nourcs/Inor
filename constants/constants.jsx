import React from 'react';
import {
  List, Package, Percent, RefreshCcw, ShoppingCart, Tag, TrendingDown, TrendingUp, Truck, XSquare,
} from 'react-feather';

export const duration = [
  { label: 'All Time', value: 'alltime' },
  { label: 'Today', value: 'today' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
  { label: 'Three Months', value: '3_months' },
  { label: 'Six Months', value: '6_months' },
  { label: 'Year', value: 'year' },
];

export const sales = [
  {
    id: 'sales',
    icon: <Tag className="h-5 w-5" />,
    name: 'Sales',
    value: 786,
    type: 'number',
  },
  {
    id: 'revenue',
    icon: <Percent className="h-5 w-5" />,
    name: 'Revenue',
    value: 17560,
    type: 'currency',
  },
  {
    id: 'cost',
    icon: <TrendingDown className="h-5 w-5" />,
    name: 'Cost',
    value: 12400,
    type: 'currency',

  },
  {
    id: 'profit',
    icon: <TrendingUp className="h-5 w-5" />,
    name: 'Profit',
    value: 5160,
    type: 'currency',
  },
];

export const purchases = [
  {
    id: 'purchases',
    icon: <ShoppingCart className="h-5 w-5" />,
    name: 'Total Purchases',
    value: 89,
    type: 'number',
  },
  {
    id: 'cancel-orders',
    icon: <XSquare className="h-5 w-5" />,
    name: 'Cancel Orders',
    value: 8,
    type: 'number',
  },
  {
    id: 'cost',
    icon: <TrendingDown className="h-5 w-5" />,
    name: 'Cost',
    value: 22400,
    type: 'currency',

  },
  {
    id: 'returns',
    icon: <RefreshCcw className="h-5 w-5" />,
    name: 'Returns',
    value: 12,
    type: 'numbers',
  },
];

export const products = [
  {
    link: '',
    name: 'Product One',
    sales: 253,
    price: 29.99,
    revenue: 2000,
  },
  {
    link: '',
    name: 'Product Two',
    sales: 177,
    price: 29.99,
    revenue: 2000,
  },
  {
    link: '',
    name: 'Product Three',
    sales: 135,
    price: 29.99,
    revenue: 2000,
  },
  {
    link: '',
    name: 'Product Four',
    sales: 89,
    price: 29.99,
    revenue: 2000,
  },
  {
    link: '',
    name: 'Product Five',
    sales: 88,
    price: 29.99,
    revenue: 2000,
  },
  {
    link: '',
    name: 'Product Six',
    sales: 56,
    price: 29.99,
    revenue: 2000,
  },
  {
    link: '',
    name: 'Product Seven',
    sales: 32,
    price: 29.99,
    revenue: 2000,
  },
  {
    link: '',
    name: 'Product Eight',
    sales: 16,
    price: 29.99,
    revenue: 2000,
  },
  {
    link: '',
    name: 'Product Nine',
    sales: 12,
    price: 29.99,
    revenue: 2000,
  },
  {
    link: '',
    name: 'Product Ten',
    sales: 8,
    price: 29.99,
    revenue: 2000,
  },
];

export const inventory = [
  {
    icon: <Package className="h-5 w-5" />,
    name: 'Total Products',
    value: 125,
  },
  {
    icon: <TrendingDown className="h-5 w-5" />,
    name: 'Low Stock Products',
    value: 12,
  },
  {
    icon: <List className="h-5 w-5" />,
    name: 'Total Categories',
    value: 3,
  },
  {
    icon: <Truck className="h-5 w-5" />,
    name: 'Total Suppliers',
    value: 19,
  },
];

export const chart = [
  {
    label: 'Jan', month: 'January', sales: 1865, purchases: 5000,
  },
  {
    label: 'Feb', month: 'February', sales: 1225, purchases: 250,
  },
  {
    label: 'Mar', month: 'March', sales: 2589, purchases: 300,
  },
  {
    label: 'Apr', month: 'April', sales: 124, purchases: 1500,
  },
  {
    label: 'May', month: 'May', sales: 532, purchases: 1250,
  },
  {
    label: 'Jun', month: 'June', sales: 6588, purchases: 200,
  },
  {
    label: 'Jul', month: 'July', sales: 895, purchases: 1500,
  },
  {
    label: 'Aug', month: 'August', sales: 3565, purchases: 750,
  },
  {
    label: 'Sep', month: 'September', sales: 1202, purchases: 1800,
  },
  {
    label: 'Oct', month: 'October', sales: 5985, purchases: 3500,
  },
  {
    label: 'Nov', month: 'November', sales: 1258, purchases: 350,
  },
  {
    label: 'Dec', month: 'December', sales: 3589, purchases: 2000,
  },
];

export const feed = [
  {
    employee: 'Nour Rihane', timestamp: '06:12 PM', type: 'return', notificaction: 'Arcu bibendum at varius vel pharetra vel turpis nunc eget.',
  },
  {
    employee: 'Nour Rihane', timestamp: '04:52 PM', type: 'oos', notificaction: 'At varius vel pharetra vel turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque.',
  },
  {
    employee: 'Nour Rihane', timestamp: '04:23 PM', type: 'purchase', notificaction: 'Vel pretium lectus quam id leo in vitae.',
  },
  {
    employee: 'Nour Cherif Essoussi', timestamp: '02:44 PM', type: 'sale', notificaction: 'Eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec.',
  },
  {
    employee: 'Nour Cherif Essoussi', timestamp: '01:07 PM', type: 'purchase', notificaction: 'Vel pretium lectus quam id leo in vitae.',
  },
  {
    employee: 'Nour Cherif Essoussi', timestamp: '11:39 AM', type: 'sale', notificaction: 'Eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec.',
  },
  {
    employee: 'Nour Cherif Essoussi', timestamp: '11:12 AM', type: 'purchase', notificaction: 'Vel pretium lectus quam id leo in vitae.',
  },
  {
    employee: 'Nour Cherif Essoussi', timestamp: '09:30 AM', type: 'sale', notificaction: 'Eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec.',
  },
];
