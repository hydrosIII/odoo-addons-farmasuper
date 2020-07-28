# -*- coding: utf-8 -*-

from odoo import fields, models


class PrintProductLabel(models.TransientModel):
    _inherit = "print.product.label"

    template = fields.Selection(
        selection_add=[(
            'garazd_product_label_76x25.report_product_label_76x25',
            'Label 76x25mm'
        )],
        default='garazd_product_label_76x25.report_product_label_76x25',
    )
