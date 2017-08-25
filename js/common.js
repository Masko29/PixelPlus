/**
 * Created by masya on 8/24/17.
 */
$(document).ready(function(){

    //toggle menu
    $('.hamburger-container').click(function(){
        $('#menu').slideToggle();
    });

    //to fix issue that toggle adds style(hides) to nav
    $(window).resize(function(){
        if(window.innerWidth > 1024) {
            $('#menu').removeAttr('style');
        }
    });

    //анимация
    var topBar = $('.hamburger li:nth-child(1)'),
        middleBar = $('.hamburger li:nth-child(2)'),
        bottomBar = $('.hamburger li:nth-child(3)');

    $('.hamburger-container').on('click', function() {
        if (middleBar.hasClass('rot-45deg')) {
            topBar.removeClass('rot45deg');
            middleBar.removeClass('rot-45deg');
            bottomBar.removeClass('hidden');
        } else {
            bottomBar.addClass('hidden');
            topBar.addClass('rot45deg');
            middleBar.addClass('rot-45deg');
        }
    });

});

$(document).ready(function(){
    $("#top").owlCarousel({
        center: true,
        animateOut: 'fadeOut',
        loop:true,
        margin:10,
        responsiveClass:true,
        autoplay: true,
        autoplayTimeout: 4000,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            768:{
                items:1,
                nav:true
            },
            992:{
                items:1,
                nav:true,
                loop:true
            }
        }
    });
});

//PopUp
$(document).ready(function(){
    PopUpHide();
});
function PopUpShow(){
    $("#popup1").show();
}
function PopUpHide(){
    $("#popup1").hide();
}

(function( $ ){

    $(function() {

        $('.rf').each(function(){
            // Объявляем переменные (форма и кнопка отправки)
            var form = $(this),
                btn = form.find('.btn_submit');

            // Добавляем каждому проверяемому полю, указание что поле пустое
            form.find('.rfield').addClass('empty_field');

            // Функция проверки полей формы
            function checkInput(){
                form.find('.rfield').each(function(){
                    if($(this).val() != ''){
                        // Если поле не пустое удаляем класс-указание
                        $(this).removeClass('empty_field');
                    } else {
                        // Если поле пустое добавляем класс-указание
                        $(this).addClass('empty_field');
                    }
                });
            }

            // Функция подсветки незаполненных полей
            function lightEmpty(){
                form.find('.empty_field').css({'background':'#FFBFD0'});
                form.find('.empty_field').css({'border':'#FF0049'});
                // Через полсекунды удаляем подсветку
                setTimeout(function(){
                    form.find('.empty_field').removeAttr('style');
                },3000);
            }

            // Проверка в режиме реального времени
            setInterval(function(){
                // Запускаем функцию проверки полей на заполненность
                checkInput();
                // Считаем к-во незаполненных полей
                var sizeEmpty = form.find('.empty_field').size();
                // Вешаем условие-тригер на кнопку отправки формы
                if(sizeEmpty > 0){
                    if(btn.hasClass('disabled')){
                        return false
                    } else {
                        btn.addClass('disabled')
                    }
                } else {
                    btn.removeClass('disabled')
                }
            },500);

            // Событие клика по кнопке отправить
            btn.click(function(){
                if($(this).hasClass('disabled')){
                    // подсвечиваем незаполненные поля и форму не отправляем, если есть незаполненные поля
                    lightEmpty();
                    return false
                } else {
                    // Все хорошо, все заполнено, отправляем форму
                    form.submit();
                }
            });
        });
    });

})( jQuery );




//navigation

window.addEventListener('DOMContentLoaded', function () {

    var catMenuItems = document.querySelectorAll('.catalog-nav .cat-menu-item'),
        catSubmenuItems = document.querySelectorAll('.catalog-nav .cat-submenu-item'),
        navCatMenu = document.querySelector('#nav-cat-menu'),
        navCatSubmenu = document.querySelector('#nav-cat-submenu');
        // Действия по клику на пункте-категории в каталоге
    for (var m = 0; m < catMenuItems.length; m++) {
        catMenuItems[m].addEventListener('click', function () {
            console.log(this.dataset.name);
            //Передаем название выбраного пункта меню в navigation
            navCatMenu.innerHTML = this.dataset.name;
            navCatMenu.style.display = 'block';
            // Если клинули не по выбранному пункту меню
            if (!this.classList.contains('active')) {
            //очистить в navigation ранее активный пункт субменю и скрыть его (чтобы не показывать \)
                navCatSubmenu.dataset.name = '';
                navCatSubmenu.style.display = 'none';
                //поубирать active
                resetCatMenu(catMenuItems);
                //Сделать данный пункт активным
                this.classList.add('active');
            } else {
                this.classList.remove('active');
            }
        });
    }

// Действия по клику на пункте субменю в каталоге
    for (var s = 0; s < catSubmenuItems.length; s++) {
        catSubmenuItems[s].addEventListener('click', function () {
            console.log(this.dataset.name);
            navCatSubmenu.innerHTML = this.dataset.name;
            navCatSubmenu.style.display = 'block';
            resetCatMenu(catSubmenuItems);
            this.classList.add('active');
        });
    }

//Эта функция убирает класс active с переданного ей меню (субменю или меню)
    function resetCatMenu(menu) {
        for (var z = 0; z < menu.length; z++) {
            menu[z].classList.remove('active');
        }
    }
});
