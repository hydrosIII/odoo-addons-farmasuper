# Copyright 2020 Anvar Kildebekov <https://it-projects.info/team/fedoranvar>
# License MIT (https://opensource.org/licenses/MIT).

{
    "name": """Res Users read rule for portal""",
    "summary": """Portal group users can log into website""",
    "category": "Access",
    "images": [],
    "version": "12.0.1.0.0",
    "application": False,

    "author": "IT-Projects LLC, Anvar Kildebekov",
    "support": "apps@it-projects.info",
    "license": "Other OSI approved licence",  # MIT
    # "price": 9.00,
    # "currency": "EUR",

    "depends": [
    ],
    "external_dependencies": {"python": [], "bin": []},
    "data": [
        'data/res_users_rule.xml',
    ],
    "demo": [
    ],
    "qweb": [
    ],

    "post_load": None,
    "pre_init_hook": None,
    "post_init_hook": None,
    "uninstall_hook": None,

    "auto_install": False,
    "installable": True,

}
