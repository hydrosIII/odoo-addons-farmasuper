# -*- coding: utf-8 -*-

from odoo import fields, models

class PosOrderLine(models.Model):
    _inherit = "pos.order.line"

    lot_number = fields.Char(string='Lotes')
    
    
    def _order_line_fields(self, line, session_id=None):
        res = super(PosOrderLine, self)._order_line_fields(line=line, session_id=session_id)
        product = self.env['product.product'].browse(line[2]['product_id'])
        lotes = ''
        if line[2]:
            if line[2]['pack_lot_ids']:
                for rec in line[2]['pack_lot_ids']:
                    lotes += rec[2].get('lot_name')
                    stock_lot = self.env['stock.production.lot'].search([('product_id', '=', product.id),('name','=',rec[2].get('lot_name'))], limit=1)
                    if stock_lot and stock_lot.use_date:
                        lotes += '\n'+stock_lot.use_date.strftime('%Y-%m-%d')
                        #exp_date = stock_lot.use_date.strftime('%Y-%m-%d')
                line[2].update({'lot_number': lotes}) # + ' ' + str(exp_date)
        return res
    
    
    