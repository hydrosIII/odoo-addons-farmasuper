# -*- coding: utf-8 -*-
{
    'name': 'Website Sale Hide Product Price',
    'summary': "Website Sale Hide Product Price",
    'description': """Only login user can see the price of product""",

    'author': 'iPredict IT Solutions Pvt. Ltd.',
    'website': 'http://ipredictitsolutions.com',
    'support': "ipredictitsolutions@gmail.com",

    'category': 'eCommerce',
    'version': '12.0.0.1.0',
    'depends': ['website_sale'],
    'data': [
        'views/website_sale_price_view.xml',
    ],

    'license': "OPL-1",
    'price': 5,
    'currency': "EUR",

    'auto_install': False,
    'installable': True,

    'images': ['static/description/main.png'],
}
