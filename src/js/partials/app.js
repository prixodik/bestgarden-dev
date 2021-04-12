
var uikit = {
    lg: '1450',
    md: '1200',
    sm: '992',
    xs: '640',
    xxs: '480',
    ww: function(){
        return $(window).width();
    },

    wh: function(){
        return $(window).height();
    },

    mask: function() {
        $("input[type='tel']").mask('+7 (000) 000-0000', { placeholder: '+7 (___) ___-____' });
        $("input.js-mask-sms").mask('0 0 0 0 0 0', { placeholder: '_ _ _ _ _ _' });
    },

    niceSelect: function(){
        $('select').niceSelect();
        $('.nice-select .list').mCustomScrollbar();
    },

    niceSelectUpdate: function(){
        $('select').niceSelect('update');
        $('.nice-select .list').mCustomScrollbar();
    },

    formatSize: function(length){
            var i = 0, type = ['б','Кб','Мб','Гб','Тб','Пб'];
            while((length / 1000 | 0) && i < type.length - 1) {
                length /= 1024;
                i++;
            }
            return length.toFixed(2) + ' ' + type[i];
    },

    upload: function(){

        /*function formatSize(length){
            var i = 0, type = ['б','Кб','Мб','Гб','Тб','Пб'];
            while((length / 1000 | 0) && i < type.length - 1) {
                length /= 1024;
                i++;
            }
            return length.toFixed(2) + ' ' + type[i];
        }*/


        // File Upload
        $.fn.fileUploader = function (filesToUpload, sectionIdentifier) {
        var fileIdCounter = 0;
            
            this.parents('.js-files-form').find(".js-file-input").change(function (evt) {
                var output = [];

                for (var i = 0; i < evt.target.files.length; i++) {
                    fileIdCounter++;
                    var file = evt.target.files[i];
                    var fileId = sectionIdentifier + fileIdCounter;

                    filesToUpload.push({ 
                        id: fileId,
                        file: file
                    });

                    var size = uikit.formatSize(file.size);
                    var removeLink = "<a class=\"js-file-delete upload-block__result-close\" href=\"#\" data-fileid=\"" + fileId + "\"><svg class=\"icon icon_close\"><use xlink:href=\"images/sprite-svg.svg#close\"></use></svg></a>";

                    output.push("<div class=\"upload-block__result-item\"><svg class=\"icon icon_close upload-block__result-icon\"><use xlink:href=\"images/sprite-svg.svg#close\"></use></svg>", "<span>", escape(file.name), "</span>", removeLink, "</div>");
                };

                $(this).parents('.js-files-form').find(".js-files-list")
                    .append(output.join(""));

                //reset the input to null - nice little chrome bug!
                evt.target.value = null;
            });

            $(document).on("click", ".js-file-delete", function (e) {
                e.preventDefault();

                var fileId = $(this).parent().children("a").data("fileid");

                // loop through the files array and check if the name of that file matches FileName
                // and get the index of the match
                for (var i = 0; i < filesToUpload.length; ++i) {
                    if (filesToUpload[i].id === fileId)
                        filesToUpload.splice(i, 1);
                }

                $(this).parent().remove();
            });

            this.clear = function () {
                for (var i = 0; i < filesToUpload.length; ++i) {
                    if (filesToUpload[i].id.indexOf(sectionIdentifier) >= 0)
                        filesToUpload.splice(i, 1);
                }

                $(this).children(".js-files-list").empty();
            }

            return this;
        };

        (function () {
            var filesToUpload = [];

            var files1Uploader = $(".js-file-input").fileUploader(filesToUpload, "files1");
            //var files2Uploader = $("#files2").fileUploader(filesToUpload, "files2");
            //var files3Uploader = $("#files3").fileUploader(filesToUpload, "files3");

            $(document).on('click','.js-upload-btn', function (e) {
                e.preventDefault();

                var formData = new FormData();

                for (var i = 0, len = filesToUpload.length; i < len; i++) {
                    formData.append("files", filesToUpload[i].file);
                }

                $.ajax({
                    url: "http://requestb.in/1k0dxvs1",
                    data: formData,
                    processData: false,
                    contentType: false,
                    type: "POST",
                    success: function (data) {
                        alert("DONE");

                        files1Uploader.clear();
                        files2Uploader.clear();
                        files3Uploader.clear();
                    },
                    error: function (data) {
                        alert("ERROR - " + data.responseText);
                    }
                });
            });
        })()
    },

    customScroll: function(){
        $('.js-custom-scroll').mCustomScrollbar();
    },

    validation: function () {
        var
          classValidate = 'is-validate',
          classParent = '.form-group',
          classError = 'is-error';
        function error(el) {
            $(el)
              .addClass(classError)
              .removeClass(classValidate)
              .closest(classParent)
              .addClass(classError)
              .removeClass(classValidate);
        }
        function validate(el) {
            $(el)
              .removeClass(classError)
              .addClass(classValidate)
              .closest(classParent)
              .removeClass(classError)
              .addClass(classValidate);
        }
        function reset(el) {
            $(el)
              .removeClass(classValidate + ' ' + classError)
              .closest(classParent)
              .removeClass(classError)
              .removeClass(classValidate + ' ' + classError)
        }
        $('.form-control').focus(function () {
            reset($(this))
        });
        $('select').change(function () {
            reset($(this))
        });
        $('input[type="checkbox"], input[type="radio"]').change(function () {
            reset($(this))
        });
        function checkInput(el) { 
            var $form = $(el);

            $form.find('.is-error').removeClass('is-error');//.each(function(){
                //$(this).removeClass('is-error');
                //console.log("!"+$form.find('.is-error').length+"!");
            //});

            $form.find('select.js-required').each(function () {
                if ($(this).val() != '') {
                    validate($(this));
                } else {
                    error($(this));
                }
            });
            $form.find('input[type=tel].js-required').each(function () {
                if ($(this).val() != '') {
                    validate($(this));
                } else {
                    error($(this));
                }
            });
            $form.find('input[type=email].js-required').each(function () {
                if ($(this).val() != '') {
                    validate($(this));
                } else {
                    error($(this));
                }
            });
            $form.find('input[type=text].js-required').each(function () {
                if ($(this).val() != '') {
                    validate($(this));
                } else {
                    error($(this));
                }
            });
            $form.find('input[type=password].js-required').each(function () {
                if ($(this).val() != '') {
                    validate($(this));
                } else {
                    error($(this));
                }
            });
            if ($('.js-pass1', $form).length != 0) {
                var pass01 = $form.find('.js-pass1').val();
                var pass02 = $form.find('.js-pass2').val();
                if (pass01 == pass02) {
                    validate($('.js-pass1, .js-pass2', $form));
                }else{
                    error($('.js-pass1, .js-pass2', $form));
                }
            }
            $form.find('textarea.js-required').each(function () {
                if ($(this).val() != '') {
                    validate($(this));
                } else {
                    error($(this));
                }
            });
            $form.find('input[type=email]').each(function () {
                var regexp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
                var $this = $(this);
                if ($this.hasClass('js-required')) {
                    if (regexp.test($this.val())) {
                        validate($this);
                    } else {
                        error($this);
                    }
                } else {
                    if ($this.val() != '') {
                        if (regexp.test($this.val())) {
                            validate($this);
                        } else {
                            error($this);
                        }
                    } else {
                        reset($this)
                    }
                }
            });

            $form.find('input[type=checkbox].js-required').each(function () {
                
                if ($(this).is(':checked')) {
                    validate($(this));
                } else {
                    error($(this));
                    //$(this).addClass('is-error');
                }
            });

            var radios = [];
            $form.find('input[type=radio]:required').each(function () {
                var name = $(this).attr('name');
                
                if( radios.indexOf(name) == -1 ){
                    
                    radios.push(name);
                    var result = false;
                    $form.find('input[name='+name+'].js-required').each(function () {
                        
                        if ($(this).is(':checked')) {
                            result = true;
                        }
                    });
                        if (result == true) {
                            validate($(this));
                            return false;
                        } else {
                            //console.log(radios);
                            $form.find('input[name='+name+'].js-required').addClass(classError);
                            error($(this));
                        }
                }
            });
        }

        $('.js-submit').click(function () {
            var $form = $(this).closest('form');
            checkInput($form);
            var errors = $form.find('.is-error:visible').length;
            //console.log(errors);
            if (errors) {
                return false;
            }else if( $(this).data('href') != "" && $(this).data('href') != undefined){

            // Открытие попапа после отправки формы.

                if( $(this).attr("href") != "" && $(this).attr("href") != undefined){
                    var href = $(this).attr("href");
                }else{
                    var href = $(this).data("href");
                }
                if($(this).data('media') == "lg" && uikit.ww() <= uikit.md){
                    return false;
                }

                var bodyWidth = $('body').width();

                $("body, html").addClass("overflow");

                    if( bodyWidth - uikit.ww() < 0){
                        //$('body').css('padding-right',((bodyWidth - uikit.ww())* -1)+'px');
                    }

                //$(".mobile-menu").removeClass("active");

                $(".popup").removeClass("active");
                $(href).addClass("active");

                return false;
            }
        });
    },

    tabs: function() {
        $('[data-tab]').click(function (e) {
            e.preventDefault();
            let tab = typeof ($(this).attr('href')) != 'undefined'?  $(this).attr('href'): $(this).attr('data-tab');
            if (typeof ($(this).attr('data-parent'))!= 'undefined') {
                $('[href="'+tab+'"], [data-tab="'+tab+'"]').closest($(this).attr('data-parent')).addClass('is-active').siblings().removeClass('is-active');
            } else {
                $(this).addClass('is-active').siblings().removeClass('is-active');
            }
            $(tab).addClass('is-visible').siblings().removeClass('is-visible');
        });

        $(".js-tab-nav").click(function(e){
            e.preventDefault();
            var href = $(this).attr("href");
            $(".tabs__nav__item, .tabs__nav-item, .tabs__body").removeClass("is-active");
            $(this).parent().addClass("is-active");
            $(href).addClass("is-active");
        });
 
        $(".js-tab-show").click(function(e){ 
            //alert(); 
            //console.log("#"+$(this).val()); 

            if( $(this).attr('href') != undefined){

                //e.preventDefault(); 
            }
            var href = ($(this).attr("href") != undefined)? $(this).attr("href") : "#"+$(this).val();
            var nav_id = $(this).data("navid");
            $(".tabs__nav__item, .tabs__nav-item, .tabs__body").removeClass("is-active");
            $(nav_id).addClass("is-active");
            $(href).addClass("is-active");
        });
        //$(".js-tab-show").che
    },

    popups: function() {
        $(document).on("click", ".js-popup-show", function(){
            if( $(this).attr("href") != "" && $(this).attr("href") != undefined){
                var href = $(this).attr("href");
            }else{
                var href = $(this).data("href");
            }
            if($(this).data('media') == "lg" && uikit.ww() <= uikit.md){
                return false;
            }

            var bodyWidth = $('body').width();

            $("body, html").addClass("overflow");

                if( bodyWidth - uikit.ww() < 0){
                    //$('body').css('padding-right',((bodyWidth - uikit.ww())* -1)+'px');
                }

            //$(".mobile-menu").removeClass("active");

            $(".popup").removeClass("active");
            $(href).addClass("active");

            

            return false;
        });

        $(".js-popup-hide").click(function(){
            $(".popup").removeClass("active");
            $("body, html").css('padding-right',0).removeClass("overflow");
            return false;
        });
    },

    lazy: function() {

        function logElementEvent(eventName, element) {
        }
        var callback_enter = function (element) {
        };
        var callback_exit = function (element) {
        };
        var callback_loading = function (element) {
        };
        var callback_loaded = function (element) {
        };
        var callback_error = function (element) {
        };
        var callback_finish = function () {
        };
        var callback_cancel = function (element) {

        };

        var lazyLoadOb = new LazyLoad({
            class_applied: "lz-applied",
            class_loading: "lz-loading",
            class_loaded: "lz-loaded",
            class_error: "lz-error",
            class_entered: "lz-entered",
            class_exited: "lz-exited",
            // Assign the callbacks defined above
            callback_enter: callback_enter,
            callback_exit: callback_exit,
            callback_cancel: callback_cancel,
            callback_loading: callback_loading,
            callback_loaded: callback_loaded,
            callback_error: callback_error,
            callback_finish: callback_finish
        });
        lazyLoadOb.update();
    },

    sliders: function(){
        var ww = this.ww();
        var wh = this.wh();
        var lg = this.lg;
        var md = this.md;
        var sm = this.sm;
        var xs = this.xs;
        var xxs = this.xxs;

        if ($('.js-gallery-main').length) {

                $('.js-gallery-main').slick({
                    slidesToShow: 1,
                    centerMode: false,
                    variableWidth: false,
                    arrows: false,
                    dots: false,
                    infinite: true,
                    autoplay: false,
                    autoplaySpeed: 2000,
                    lazyLoad: 'progressive',
                    //fade: true,
                    asNavFor: '.js-gallery-thumb'
                });

                $(".js-gallery-thumb").slick({
                        focusOnSelect: true,
                        infinite: true,
                        variableWidth: false,
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        centerMode: false,
                        lazyLoad: 'progressive',
                        arrows: false,
                        fade: false,
                        asNavFor: '.js-gallery-main',
                        nextArrow: '<button type="button" class="gallery-block__thumb-next slick-next slick-arrow"><svg class="icon"><use xlink:href="images/sprite-svg.svg#arrow-right"></svg></button>',
                        prevArrow: '<button type="button" class="gallery-block__thumb-prev slick-prev slick-arrow"><svg class="icon"><use xlink:href="images/sprite-svg.svg#arrow-right"></svg></button>',
                        responsive: [/*{
                            breakpoint: lg,
                            settings: {
                                slidesToShow: 4,
                            }
                        },*/{
                            breakpoint: sm,
                            settings: {
                                slidesToShow: 4,
                            }
                        },{
                            breakpoint: xs,
                            settings: {
                                slidesToShow: 3,
                            }
                        }]
                });

        }

        if ($('.js-product-imgs').length) {

                var counter = $('.js-product-imgs .main-section__img-item:not(.slick-cloned)').length;

                $('.js-product-imgs').on('afterChange', function(slick, currentSlide){
                    $('.js-product-imgs-counter').text(+(currentSlide.currentSlide+1)+' / '+currentSlide.slideCount);
                });

                $('.js-product-imgs').on('init', function(slick){
                    var dom = slick.target;
                    var counter = $(dom).find('.slick-slide:not(.slick-cloned)').length;
                    $('.js-product-imgs-counter').text('1 / '+counter);
                });

                $('.js-product-imgs').slick({
                    slidesToShow: 1,
                    centerMode: false,
                    variableWidth: false,
                    arrows: false,
                    dots: false,
                    infinite: true,
                    autoplay: false,
                    autoplaySpeed: 2000,
                    lazyLoad: 'progressive',
                    //fade: true,
                    asNavFor: '.js-product-thumbs'
                });

                var vertical = ( ww <= md )? false : true;

                $(".js-product-thumbs").slick({
                        focusOnSelect: true,
                        infinite: true,
                        variableWidth: false,
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        centerMode: true,
                        lazyLoad: 'progressive',
                        arrows: true,
                        fade: false,
                        asNavFor: '.js-product-imgs',
                        vertical: vertical,
                        nextArrow: '<button type="button" class="main-section__thumbs-next slick-next slick-arrow"><svg class="icon"><use xlink:href="images/sprite-svg.svg#arrow-right"></svg></button>',
                        prevArrow: '<button type="button" class="main-section__thumbs-prev slick-prev slick-arrow"><svg class="icon"><use xlink:href="images/sprite-svg.svg#arrow-right"></svg></button>',
                        responsive: [/*{
                            breakpoint: lg,
                            settings: {
                                slidesToShow: 4,
                            }
                        },*/{
                            breakpoint: md,
                            settings: {
                                /*slidesToShow: 4,
                                slidesToScroll: 4,
                                variableWidth: true,*/
                                //vertical: false
                            }
                        }]
                });

        }

        if( $(".js-index-slider-img").length || $(".js-index-slider-info").length){

            $(".js-index-slider-img").slick({
                    infinite: true,
                    variableWidth: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    lazyLoad: 'progressive',
                    arrows: false,
                    fade: false,
                    asNavFor: $('.js-index-slider-info'),
            });

            $(".js-index-slider-info").slick({
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    lazyLoad: 'progressive',

                    arrows: false,
                    dots: true,
                    asNavFor: $('.js-index-slider-img'),
                    appendDots: $('.js-index-slider-dots'),
                    fade: true,
                    //nextArrow: '<button type="button" class="slider-section__next slick-next slick-arrow slick-arrow--circle slick-arrow--white"><svg class="icon"><use xlink:href="images/sprite.svg#arrow-right-2"></svg></button>',
                    //prevArrow: '<button type="button" class="slider-section__prev slick-prev slick-arrow slick-arrow--circle slick-arrow--white"><svg class="icon"><use xlink:href="images/sprite.svg#arrow-left-2"></svg></button>',
                    responsive: [{
                        breakpoint: xs,
                        settings: {
                            adaptiveHeight: true
                        }
                    }]
            });

            $('.js-index-slider-next').click(function(){
                $('.js-index-slider-img').slick('slickNext');
                $('.js-index-slider-info').slick('slickNext');
                return false;
            });

        }

        /*if ($('.js-categorys-slider').length) {
            $('.js-categorys-slider').each(function () {
                var $this = $(this);

                $this.slick({
                    slidesToShow: 1,
                    centerMode: false,
                    variableWidth: true,
                    arrows: true,
                    dots: false,
                    infinite: true,
                    autoplay: false,
                    autoplaySpeed: 2000,
                    lazyLoad: 'progressive',
                    prevArrow: '<div class="main-section__categorys-prev"><a href="#" tabindex="-1"><svg class="icon icon_arrow-right"><use xlink:href="images/sprite-svg.svg#arrow-right"></use></svg></a></div>',
                    nextArrow: '<div class="main-section__categorys-next"><a href="#" tabindex="-1"><svg class="icon icon_arrow-right"><use xlink:href="images/sprite-svg.svg#arrow-right"></use></svg></a></div>',
                    responsive: [

                      
                    ]
                });
            });

        }*/

        /*if ($('.js-brands-slider').length) {
            $('.js-brands-slider').each(function () {
                var $this = $(this);

                $this.slick({
                    slidesToShow: 1,
                    centerMode: false,
                    variableWidth: true,
                    arrows: false,
                    dots: false,
                    infinite: true,
                    autoplay: false,
                    autoplaySpeed: 2000,
                    lazyLoad: 'progressive',
                    prevArrow: '<button class="page__slider__prev slick-next slick-arrow b-btn-round"><svg viewBox="0 0 13 25" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.6723 2.45883L2.75345 12.4985L12.6682 22.534C13.1128 22.9841 13.107 23.704 12.6723 24.1544L12.6682 24.1586C12.4496 24.3799 12.1549 24.5 11.8601 24.5C11.5779 24.5 11.2769 24.3944 11.0486 24.1551L0.331801 13.3078C-0.107438 12.8632 -0.114363 12.1328 0.333533 11.6875L11.0461 0.83839C11.4941 0.384922 12.2156 0.39088 12.664 0.834205L12.6682 0.83839C13.1128 1.28845 13.107 2.00835 12.6723 2.45883Z"></path></svg></button>',
                    nextArrow: '<button class="page__slider__next slick-next slick-arrow b-btn-round"><svg viewBox="0 0 13 25" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.327692 2.45883L10.2466 12.4985L0.331826 22.534C-0.112823 22.9841 -0.107016 23.704 0.327692 24.1544L0.331826 24.1586C0.550447 24.3799 0.845074 24.5 1.13989 24.5C1.42207 24.5 1.72311 24.3944 1.95143 24.1551L12.6682 13.3078C13.1074 12.8632 13.1144 12.1328 12.6665 11.6875L1.95391 0.83839C1.5059 0.384922 0.784378 0.39088 0.33596 0.834205L0.331826 0.83839C-0.112823 1.28845 -0.107016 2.00835 0.327692 2.45883Z"></path></svg></button>',
                    responsive: [

                        {
                            breakpoint: xs,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                                rows: 2,
                                arrows: true,
                                slidesPerRow: 2,
                                prevArrow: $('.js-brand-slider-prev'),
                                nextArrow: $('.js-brand-slider-next')
                            }
                        }
                    ]
                });


            });

        }*/

        if ($('.js-products-slider').length) {
            $('.js-products-slider').each(function () {
                var $this = $(this);

                $this.slick({
                    slidesToShow: 3,
                    centerMode: false,
                    variableWidth: false,
                    arrows: true,
                    dots: true,
                    infinite: true,
                    autoplay: false,
                    autoplaySpeed: 2000,
                    lazyLoad: 'progressive',
                    prevArrow: '<a href="#" class="products-section__prev slick-arrow slick-prev" tabindex="-1"><svg class="icon icon_arrow-right-2"><use xlink:href="images/sprite-svg.svg#arrow-right-2"></use></svg></a>',
                    nextArrow: '<a href="#" class="products-section__next slick-arrow slick-next" tabindex="-1"><svg class="icon icon_arrow-right-2"><use xlink:href="images/sprite-svg.svg#arrow-right-2"></use></svg></a>',
                    responsive: [
                        {
                            breakpoint: lg,
                            settings: {
                                arrows: false,
                                //slidesToShow: 4,
                                //slidesToScroll: 4
                            }
                        },
                        {
                            breakpoint: sm,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: xs,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });

            });

            $('.js-products-slider-prev').click(function(){
                $('.js-products-slider').slick('slickPrev');
                return false;
            });
            $('.js-products-slider-next').click(function(){
                $('.js-products-slider').slick('slickNext');
                return false;
            });

        }

        /*if ($('.js-default-sm-slider').length && ww <= sm) {

            var carousel = $('.js-default-sm-slider');
            carousel.slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                arrow: true,
                dots: true,
                prevArrow: '<button class="page__slider__prev slick-next slick-arrow b-btn-round"><svg viewBox="0 0 13 25" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.6723 2.45883L2.75345 12.4985L12.6682 22.534C13.1128 22.9841 13.107 23.704 12.6723 24.1544L12.6682 24.1586C12.4496 24.3799 12.1549 24.5 11.8601 24.5C11.5779 24.5 11.2769 24.3944 11.0486 24.1551L0.331801 13.3078C-0.107438 12.8632 -0.114363 12.1328 0.333533 11.6875L11.0461 0.83839C11.4941 0.384922 12.2156 0.39088 12.664 0.834205L12.6682 0.83839C13.1128 1.28845 13.107 2.00835 12.6723 2.45883Z"></path></svg></button>',
                nextArrow: '<button class="page__slider__next slick-next slick-arrow b-btn-round"><svg viewBox="0 0 13 25" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.327692 2.45883L10.2466 12.4985L0.331826 22.534C-0.112823 22.9841 -0.107016 23.704 0.327692 24.1544L0.331826 24.1586C0.550447 24.3799 0.845074 24.5 1.13989 24.5C1.42207 24.5 1.72311 24.3944 1.95143 24.1551L12.6682 13.3078C13.1074 12.8632 13.1144 12.1328 12.6665 11.6875L1.95391 0.83839C1.5059 0.384922 0.784378 0.39088 0.33596 0.834205L0.331826 0.83839C-0.112823 1.28845 -0.107016 2.00835 0.327692 2.45883Z"></path></svg></button>',
                responsive: [
                    {
                        breakpoint: xs,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: countSlide ==  1? false:true,
                        }
                    }
                ]
            });

        }

        if ($('.js-default-xs-slider').length && ww <= xs) {

            var carousel = $('.js-default-xs-slider');
            carousel.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrow: true,
                dots: true,
                prevArrow: '<button class="page__slider__prev slick-next slick-arrow b-btn-round"><svg viewBox="0 0 13 25" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.6723 2.45883L2.75345 12.4985L12.6682 22.534C13.1128 22.9841 13.107 23.704 12.6723 24.1544L12.6682 24.1586C12.4496 24.3799 12.1549 24.5 11.8601 24.5C11.5779 24.5 11.2769 24.3944 11.0486 24.1551L0.331801 13.3078C-0.107438 12.8632 -0.114363 12.1328 0.333533 11.6875L11.0461 0.83839C11.4941 0.384922 12.2156 0.39088 12.664 0.834205L12.6682 0.83839C13.1128 1.28845 13.107 2.00835 12.6723 2.45883Z"></path></svg></button>',
                nextArrow: '<button class="page__slider__next slick-next slick-arrow b-btn-round"><svg viewBox="0 0 13 25" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.327692 2.45883L10.2466 12.4985L0.331826 22.534C-0.112823 22.9841 -0.107016 23.704 0.327692 24.1544L0.331826 24.1586C0.550447 24.3799 0.845074 24.5 1.13989 24.5C1.42207 24.5 1.72311 24.3944 1.95143 24.1551L12.6682 13.3078C13.1074 12.8632 13.1144 12.1328 12.6665 11.6875L1.95391 0.83839C1.5059 0.384922 0.784378 0.39088 0.33596 0.834205L0.331826 0.83839C-0.112823 1.28845 -0.107016 2.00835 0.327692 2.45883Z"></path></svg></button>',
            });

        }*/
    },

    fancybox: function(){
        $(".js-fancybox, .fancybox").fancybox({
            // Options will go here
            iframe : {
                preload : false
            }
        });
    },

    accardion: function(){
        $('.js-accardion-toggle').click(function(){ 
            $(this).toggleClass('is-active').next().toggleClass('is-active');
            return false;
        });
    },

    mobile: function(){
        $('.js-mobile-menu-toggle').click(function(){
            $(this).toggleClass('active');
            //$('.js-mobile-menu').toggleClass('is-active');
            $('.js-mobile-menu').slideToggle();
            return false;
        })
    },

    mainInit: function () {
        
        this.sliders();
        
        this.lazy();
        this.validation();
        
        this.tabs();
        
        this.niceSelect();
        
        this.fancybox();
        this.popups();
        this.mask();
        this.accardion();
        this.mobile();
        this.upload();
        //this.customScroll();
        
    }
};
$(document).ready(function () { 

    uikit.mainInit();

    // Разворот текстового описания
    $(".js-more-text").click(function(){
        if( $(this).hasClass('hide') == false ){
            $(this).addClass('hide');
            $(this).parent().parent().find(".js-wrap-text").removeClass("d-none");
        }else{
            $(this).removeClass('hide');
            $(this).parent().parent().find(".js-wrap-text").addClass("d-none");
        }
        return false;
    });

});
var clrTimeOut;
$(window).on('load', function (e) {
    clearTimeout(clrTimeOut);
    clrTimeOut = setTimeout(function () {
        
    }, 200);
});

$(window).resize(function () {
    clearTimeout(clrTimeOut);
    clrTimeOut = setTimeout(function () {
        
    }, 200);

});

$(window).scroll(function () {
    //uikit.headerFixed();
});
