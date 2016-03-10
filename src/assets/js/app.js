(function($) {

    "use strict";

    $(function() {

        $.fn.prettyPre = function( obj ) {

            var defaults = { type: "space" },
                settings, str;

            settings = $.merge( defaults, obj || {} );

            str = ( settings.type === "space" ) ? " " : "\t";

            return $(this).each( function() {

                var $this = $(this),
                    html = $this.html(),
                    lead = "",
                    remove;

                while( html.indexOf( str ) === 0 ) {

                    lead += str;
                    html = html.substring(1);

                }

                remove = new RegExp("\n" + lead, "g");

                html =
                    html
                        .replace(remove, "\n")
                        .replace(/\s+$/g, "");

                $this.html( html );

            });

        };

        $.fn.pretty = function() {

            $(this).each(function() {

                var lang = $(this).data("lang") || "";

                $(this)
                    .addClass( "prettyprint" )
                    .removeClass( "code" )
                    .addClass( "lang-" + lang )
                    .addClass( "txt-code fw-thin f1 bg-pitch-darker light pad-v20 pad-h30 bor-rad3" );

            });

            return $(this);

        };

        $("code.code").pretty();
        $("pre.code").prettyPre().pretty();
        prettyPrint();

    });

}(jQuery));
