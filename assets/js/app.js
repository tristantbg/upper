/* globals $:false */
var width = $(window).width(),
    height = $(window).height(),
    isMobile = false,
    maxShadow = 25,
    $root = '/';
$(function() {
    var app = {
        init: function() {
            $(window).resize(function(event) {
                app.sizeSet();
                app.placePostIt();
            });
            $(document).ready(function($) {
                $body = $('body');
                app.sizeSet();
                // var gridWidth = 200;
                // var gridHeight = 100;
                Draggable.create('.post-it', {
                    bounds: document.getElementById("post-it-container"),
                    throwProps: true,
                    edgeResistance: 0.9,
                    // snap: {
                    //     x: function(endValue) {
                    //         return Math.round(endValue / gridWidth) * gridWidth;
                    //     },
                    //     y: function(endValue) {
                    //         return Math.round(endValue / gridHeight) * gridHeight;
                    //     }
                    // },
                    onDrag: function() {
                        app.updateShadow($(this.target), 0, this.x, this.y);
                    },
                    onThrowUpdate: function() {
                        app.updateShadow($(this.target), 0, this.x, this.y);
                    },
                    onDragEnd: function() {
                        app.updateShadow($(this.target), 0, this.x, this.y);
                    }
                });
                $body.on('click', '[data-target]', function(event) {
                    event.preventDefault();
                    var target = $(this).data('target');
                    var elems = $('.post-it.' + target + '-item:not(".visible")');
                    if (elems.length > 0) {
                        elems.addClass('visible');
                    }
                });
                $body.on('click', '.close', function(event) {
                    event.preventDefault();
                    $(this).parent().parent().removeClass('visible');
                });
                $(window).load(function() {
                    app.placePostIt();
                    $(".loader").fadeOut("fast", function() {
                        if (isMobile) {
                            setTimeout(app.scrollInView, 1000);
                        }
                    });
                });
            });
        },
        sizeSet: function() {
            width = $(window).width();
            height = $(window).height();
            if (width <= 770 || Modernizr.touch) isMobile = true;
            if (isMobile) {
                if (width >= 770) {
                    //location.reload();
                    isMobile = false;
                }
            }
        },
        scrollInView: function() {
            TweenLite.to($body, 1.3, {
                scrollTop: height - 30
            });
        },
        placePostIt: function() {
            if (!isMobile) {
                $postit = $('.post-it');
                var interval = 500;
                $postit.each(function() {
                    var el = $(this);
                    el.removeClass('visible');
                    var randX = rand(100, width - el.outerWidth() - 100);
                    var randY = rand(100, height - el.outerHeight() - 100);
                    TweenLite.to(el, 0, {
                        x: randX,
                        y: randY,
                        onComplete: function(){
                          app.updateShadow(el);
                        }
                    });
                    setTimeout(function() {
                        el.addClass('visible');
                    }, interval);
                    interval += 500;
                });
                
            }
        },
        updateShadow: function(target, time, x, y) {
            var w = target.outerWidth() / 2;
            var h = target.outerHeight() / 2;
            x = typeof x !== 'undefined' ? x : target.offset().left;
            y = typeof y !== 'undefined' ? y : target.offset().top;
            var shadowX = -(1 - ((x + w) * 2) / width) * maxShadow;
            var shadowY = -(1 - ((y + h) * 2) / height) * maxShadow * 1.5;
            if (shadowX > maxShadow) shadowX = maxShadow;
            if (shadowX < -maxShadow) shadowX = -maxShadow;
            if (shadowY > maxShadow) shadowY = maxShadow;
            if (shadowY < -maxShadow) shadowY = -maxShadow;
            TweenLite.fromTo(target, time, {
                'boxShadow': '0 0 0 rgba(0,0,0,0.3)'
            }, {
                'boxShadow': shadowX + 'px ' + shadowY + 'px ' + '0 rgba(0,0,0,0.3)'
            });
        },
        loadContent: function(url, target) {
            $.ajax({
                url: url,
                success: function(data) {
                    $(target).html(data);
                }
            });
        }
    };
    app.init();
});

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}