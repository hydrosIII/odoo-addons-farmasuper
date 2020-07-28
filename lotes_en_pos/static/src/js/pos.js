odoo.define('farmasuper.pos_lotnumer_selection', function(require){
    var screens = require('point_of_sale.screens');
	var models = require('point_of_sale.models');
	var gui = require('point_of_sale.gui');
	var PopupWidget = require('point_of_sale.popups');
	
	models.load_models({
        model: 'stock.production.lot',
        fields: ['id','name','product_id','use_date','life_date'],
        domain: null,
        loaded: function(self,list_lot_num){
            self.list_lot_num = list_lot_num;
        },
    });
	
	var PacklotlineSuper = models.Packlotline;
    models.Packlotline = models.Packlotline.extend({
		init_from_JSON: function(json) {
	        var data = PacklotlineSuper.prototype.init_from_JSON.apply(this, arguments);
	        this.set_lot_exp_date(json.lot_exp_date);
	    },
		set_lot_exp_date: function(exp_date){
	        this.set({lot_exp_date : exp_date || null});
	    },
		get_lot_exp_date: function(){
	        return this.get('lot_exp_date');
	    },
	
	    export_as_JSON: function(){
	        var data = PacklotlineSuper.prototype.export_as_JSON.apply(this, arguments);
			data.lot_exp_date = this.get_lot_exp_date();
			return data;
	    },
	
	});
	
	var PackLotLinePopupWidget = PopupWidget.extend({
	    template: 'PackLotLinePopupWidget',
	    events: _.extend({}, PopupWidget.prototype.events, {
	        'click .remove-lot': 'remove_lot',
	        'keydown': 'add_lot',
	        'blur .packlot-line-input': 'lose_input_focus'
	    }),
	
	    show: function(options){
	        this._super(options);
	        this.focus();
	    },
	
	    click_confirm: function(){
	        var pack_lot_lines = this.options.pack_lot_lines;
			
			var list_lot_num = this.pos.list_lot_num;
			var product_id = this.options.order_line.product.id;
	        this.$('.packlot-line-input').each(function(index, el){
	            var cid = $(el).attr('cid'),
	                lot_name = $(el).val();
				debugger;
				var lot_exist = list_lot_num.filter(function(lot_num) {
				  return lot_num.name==lot_name && lot_num.product_id[0]==product_id ;
				});
	            var pack_line = pack_lot_lines.get({cid: cid});
	            pack_line.set_lot_name(lot_name);
				if (lot_exist.length > 0){
					if (lot_exist[0].use_date){
						var use_date = lot_exist[0].use_date.substring(0,10)
					}
					else{
						var use_date = '';
					}
					pack_line.set_lot_exp_date(use_date);
				}
	        });
	        pack_lot_lines.remove_empty_model();
	        pack_lot_lines.set_quantity_by_lot();
	        this.options.order.save_to_db();
	        this.options.order_line.trigger('change', this.options.order_line);
	        this.gui.close_popup();
	    },
	
	    add_lot: function(ev) {
	        if (ev.keyCode === $.ui.keyCode.ENTER && this.options.order_line.product.tracking == 'serial'){
	            var pack_lot_lines = this.options.pack_lot_lines,
	                $input = $(ev.target),
	                cid = $input.attr('cid'),
	                lot_name = $input.val();
	
	            var lot_model = pack_lot_lines.get({cid: cid});
	            lot_model.set_lot_name(lot_name);  // First set current model then add new one
	            if(!pack_lot_lines.get_empty_model()){
	                var new_lot_model = lot_model.add();
	                this.focus_model = new_lot_model;
	            }
	            pack_lot_lines.set_quantity_by_lot();
	            this.renderElement();
	            this.focus();
	        }
	    },
	
	    remove_lot: function(ev){
	        var pack_lot_lines = this.options.pack_lot_lines,
	            $input = $(ev.target).prev(),
	            cid = $input.attr('cid');
	        var lot_model = pack_lot_lines.get({cid: cid});
	        lot_model.remove();
	        pack_lot_lines.set_quantity_by_lot();
	        this.renderElement();
	    },
	
	    lose_input_focus: function(ev){
	        var $input = $(ev.target),
	            cid = $input.attr('cid');
	        var lot_model = this.options.pack_lot_lines.get({cid: cid});
	        lot_model.set_lot_name($input.val());
	    },
	
	    focus: function(){
	        this.$("input[autofocus]").focus();
	        this.focus_model = false;   // after focus clear focus_model on widget
	    }
	});
	gui.define_popup({name:'packlotline', widget:PackLotLinePopupWidget});
});