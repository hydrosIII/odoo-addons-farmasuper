# -*- coding: utf-8 -*-
##############################################################################
#                 @author IT Admin
#
##############################################################################
{
    'name': 'lotes_en_pos',
    'version': '12.11',
    'description': ''' ''',
    'category': '',
    'author': '',
    'website': '',
    'depends': ['custom_invoice','point_of_sale'],
    'data': [
        'views/pos_order_view.xml'
    ],
    'qweb': [
        'static/src/xml/pos.xml',
    ],
    'application': False,
    'installable': True,   
}
