(function () {
    var data = {};

    function getJSON() {
        $.getJSON("../file.json", function (responce) {
            data = responce;

            buildTable();
        });
    }

    getJSON();

    function buildTable() {
        var str = '';
        $(data.specialties).each(function (index, element) {
            var specialtyCode = element.specialtyCode;
            var outputArray = [];
            var department = '';
            $(element.departments).each(function (index, element) {
                var departmentInfo = {};
                department = element.departmentName;
                $(element.disciplinies).each(function (index, element) {
                    var disciplineInfo = {
                        'disciplineCode': specialtyCode,
                        'disciplineNumberTitle': element.name,
                        'creditAmount': element.creditAmount,
                        'startTerm': element.startTerm,
                        'disciplineAmount': element.propositionList.length,
                        'propositionDisciplines': []
                    };
                    $(element.propositionList).each(function (index, element) {
                        disciplineInfo.propositionDisciplines.push({
                            'disciplineName': element.disciplineName,
                            'teachingDepartment': element.teachingDepartment
                        });
                    });
                    outputArray.push(disciplineInfo);
                });
            });

            $(outputArray)
                .each(function (index, element) {
                    str = '';

                    str += ('<tbody><tr class="discipline-click"><td colspan="6" class="img-btn">' + element.disciplineNumberTitle + ' </td> </tr> ');
                    for (var j = 0; j < element.propositionDisciplines.length; j++) {
                        str += ('<tr class="hidden-block line"> <td>' + element.propositionDisciplines[j].disciplineName + ' </td> ');
                        str += ('<td>' + element.propositionDisciplines[j].teachingDepartment + ' </td> ');
                        str += ('<td class="folder-details">' + ' <img src="../images/folder.png" />' + ' </td> ');
                        str += ('<td>' + "Примітка " + j + ' </td> </tr> ');
                    }
                    str += "</tbody>";
                    $('table').append(str);


                });

            str = '';

        });
        $('.discipline-click').on('click', function (event) {
            event.preventDefault();
            var childRow = $(this).siblings();
            console.log($(childRow).css('display'));
            if (!$(childRow).hasClass('hidden-block')) {
                $(childRow).addClass('hidden-block');
                $(this).children().removeClass('img-btn-minus');
            } else {
                $(childRow).removeClass('hidden-block');
                $(this).children().addClass('img-btn-minus');
            }
        });
    }
    
})();




