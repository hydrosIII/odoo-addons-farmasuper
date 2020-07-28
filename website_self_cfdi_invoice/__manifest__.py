# -*- coding: utf-8 -*-
{
    'name': "Portal de Auto-Facturacion CFDI",

    'summary': """
        Portal de Cliente diseñado para generar facturas desde la Web.""",

    'description': """

Portal Auto-Facturacion CFDI
================================

Permite al Cliente poder generar su Factura mediante la Parte Web.

    """,

    'author': "IT Admin",
    'website': "www.itadmin.com.mx",
    'category': 'Facturacion Electronica',
    'version': '12.3',
    'depends': [
        'website_sale_stock',
        'website_crm',
        'custom_invoice',
        'point_of_sale',
        ],
    'data': [
        'security/ir.model.access.csv',
        'views/templates.xml',
    ],

}
