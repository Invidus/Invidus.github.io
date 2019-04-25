$(document).ready(function () {
    $.getJSON("./jsons/films.json",
        function (films) {
            let counter = 0;
            var i = 15;
            var titleArray = []; //Массив для вывода фильмов из json
            var searchArray = [];//Массив с выбранными тегами
            $.getJSON("./jsons/tags.json",
                function (allTags) {
                    $.each(allTags, function (id, value) {
                        $('#tags').append($('<button  id = "tagsButton" class = "btn btn-light tags-button button-unpressed">'
                            + value + '</button>'));
                    })
                });

            //Обработка нажатия кнопки тега
            $("#tags").on('click', '#tagsButton', function () {
                if (searchArray.indexOf($(this).text()) === -1) {
                    searchArray.push($(this).text().split(' ').join(''));
                }
                else {
                    //Удаление при повторном нажатии
                    searchArray.splice(searchArray.indexOf($(this).text()), 1);
                }
            });
            //Обработка нажатия кнопки тега

            $.each(films, function (id, value) {
                titleArray.push(value);
            });
            output();

            // Обработка кнопки показать еще
            $('#showMore').click(function () {
                if (i <= titleArray.length) {
                    output();
                    if (i > titleArray.length) {
                        i -= 15;
                        i = i + (titleArray.length - i);
                        for (var j = counter; j < i; j++) {
                            $('#filmsInfo').append($('<tr> <td id = "search-dropdown" class = "search-dropdown">'
                                + titleArray[j].title + ' <i id ="addButton" class="far fa-star"></i><p>'
                                + titleArray[j].tags + '</p></td></tr>'));
                        }
                        $('#showMore').css({ 'display': 'none' });
                    }
                } else {
                    $('#showMore').css({ 'display': 'none' });
                }
            });
            // Обработка кнопки показать еще

            var key = 0;  // ключ для LocalStorage
            // Обработка кнопки добавления в закладки
            $('#filmsInfo').on('click', '#addButton', function (e) {
                $("#films-bookmarks").on("click", "#bookmarks-block", function (f) {
                    $(this).hide();
                    $('td:contains("' + $(this).text() + '")').children().removeClass('fas');
                })
                if ($(this).hasClass('fas')) {
                    $(this).removeClass('fas');
                    $('p:contains("' + $(e.target).parent().text() + '")').hide();
                }
                else {
                    $(this).addClass('fas');
                    $('p:contains("' + $(e.target).parent().text() + '")').show();
                    if ($("#films-bookmarks").text().includes($(e.target).parent().text()) == false) {
                        localStorage.setItem(key, JSON.stringify($(this).parent().text()));
                        $('#films-bookmarks').append($('<p  class = "bookmarks-container"  id = "bookmarks-block">'
                         + JSON.parse(localStorage.getItem(key)) +
                            '<i id ="addButton-bm" class="fas fa-star"></i></p>'));
                        key++;
                    }
                }
            });

            //Клики на табы
             $('#bookmarks-tab').on('click', function () {
                $('#showMore').hide();
                $('#bookmarks-tab').addClass('content');
                $('#films-tab').removeClass('content');
                $('#footer').hide();
            })
            $('#films-tab').on('click', function () {
                $('#bookmarks-tab').removeClass('content');
                $('#films-tab').addClass('content');
                if (i != titleArray.length) {
                    $('#showMore').show();
                }
                $('#footer').show();
            })

            // liveSearch 
            //Поиск по тегу
            $("#tags").on('click', '#tagsButton', function () {
                // $('tr').css({ "display": "none" });
                if (i != titleArray.length) {
                    outputAll();
                }
                $('#showMore').css({ 'display': 'none' });
                $(this).toggleClass('button-pressed');
                var contain = true // переменная для хранения данных о присутствии тега в строке
                $.each($("tr"), function () {
                    var contain = true
                    if (searchArray != "") {
                        searchArray.forEach(elem => {
                            if ($(this).text().includes(elem)) {
                            } else { contain = false; }
                            if (contain == true) {
                                $(this).show();
                            } else {
                                $(this).hide();
                            }
                        })
                    } else {
                        $(this).show();
                    }
                })
            });
            //Поиск по тегу

            //Поиск по названию
            $("#search").keyup(function () {
                $('#showMore').css({ 'display': 'none' });
                if (i != titleArray.length) {
                    outputAll();
                }
                var count = 0;// Счетчик выведенных строк при поиске
                $.each($("tr td"), function () {
                    if ($("#search").val() != "") {
                        if ($(this).text().toLowerCase().indexOf($("#search").val().toLowerCase()) === -1) {
                            $(this).hide();
                        } else {
                            count++;
                            if (count < 16) {
                                $(this).show();
                            } else {
                                $(this).hide();
                            }
                        }
                    } else {
                        $(this).show();
                    }

                });
            });
            //Поиск по названию
            // liveSearch 

            //Первоначальный Вывод списка фильмов
            function output() {
                for (var j = counter; j <= i; j++) {
                    $('#filmsInfo').append($('<tr> <td id = "search-dropdown1" class = "search-dropdown">'
                        + titleArray[j].title + ' <i id ="addButton" class="far fa-star"></i><p>'
                        + titleArray[j].tags + '</p></td></tr>'));
                    counter++;
                }
                i += 15;
            };
            //Вывод всего списка фильмов
            function outputAll() {
                for (i; i <= titleArray.length; i) {
                    for (var j = counter; j <= i; j++) {
                        $('#filmsInfo').append($('<tr> <td id = "search-dropdown1" class = "search-dropdown">'
                            + titleArray[j].title + ' <i id ="addButton" class="far fa-star"></i><p>'
                            + titleArray[j].tags + '</p></td></tr>'));
                        counter++;
                    }
                    i += 15;
                }
                
                if (i > titleArray.length) {
                    i -= 15;
                    i = i + (titleArray.length - i);
                    for (var j = counter; j < i; j++) {
                        $('#filmsInfo').append($('<tr> <td id = "search-dropdown1" class = "search-dropdown">'
                            + titleArray[j].title + ' <i id ="addButton" class="far fa-star"></i><p>'
                            + titleArray[j].tags + '</p></td></tr>'));
                        counter++;
                    }
                }
            };
        }
    )
})
