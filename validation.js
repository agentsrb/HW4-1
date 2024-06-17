/**
 * generate table using user inputs
 * @param inputs    array       array of integers to be used as matrix bounds
 * @return          none
 */
function generateTableMatrix(inputs) {

    // find starting values for matrix
    var x_start = Math.min(inputs[0], inputs[1]);
    var x_end = Math.max(inputs[0], inputs[1]);

    var y_start = Math.min(inputs[2], inputs[3]);
    var y_end = Math.max(inputs[2], inputs[3]);

    // generate table
    let table = document.createElement('table');
    table.classList.add('table')
    table.classList.add('table-bordered')

    // generate first row (headers)
    let header = table.insertRow(-1);
    header.classList.add('display-above')
    // first cell is always empty
    header.insertCell(-1);
    // populate row headers
    for (c = x_start; c <= x_end; c++) {
        let cell = header.insertCell(-1);
        cell.innerText = c;
    }

    // generate all other rows
    for (let r = y_start; r <= y_end; r++) {
        row = table.insertRow(-1);

        // first cell is always a header
        let header = row.insertCell(-1);
        header.innerText = r;
        
        // generate cells in row
        for (let c = x_start; c <= x_end; c++) {
            let cell = row.insertCell(-1);
            cell.innerText = r * c;

            // highlight cells in every other row for readability
            if (r % 2 == 0) {
                cell.classList.add('active');
            }
        }
    }

    // clear table container contents
    // place table on page
    var container = document.getElementById('tableContainer');
    container.innerHTML = '';
    container.appendChild(table);

    return;
}

//  validation and table generation
$(function() {

    // function to check range between 2 inputs
    $.validator.addMethod("tableSizeConstraint", function(value, element, params) {
        // get base 10 numbers from arg
        var number_1 = parseInt($(params.firstElement).val(), 10);
        var number_2 = parseInt($(params.secondElement).val(), 10);

        // ignores check on not required fields
        // returns true iff first 2 elements are no more than 200 units apart
        return this.optional(element) || Math.abs(number_1 - number_2) <= params.maxDifference;;
    }, function(params, element) {
        // dynamic error message
        return "The numbers must not be more than " + params.maxDifference + " apart.";
    });


    // get form by id
    $("#validate").validate({
        // on validate
        // ruleset for inputs
        rules: {
            // all inputs must exist
            // all inputs must be a number
            // all numbers must be  between -1000 and 1000
            input_1: {
            // multiplier start
                required: true,
                number: true,
                max: 1000,
                min: -1000,
            },
            input_2: {
            // multiplier end
                required: true,
                number: true,
                max: 1000,
                min: -1000,
                // constrain the range between number_1 and number_2 to a max of 200
                tableSizeConstraint: {
                    firstElement: '#number_1',
                    secondElement: '#number_2',
                    maxDifference: 200
                }
            },
            input_3: {
            // multiplicand start
                required: true,
                number: true,
                max: 1000,
                min: -1000,
            },
            input_4: {
            // multiplicand end
                required: true,
                number: true,
                max: 1000,
                min: -1000,
                // constrain the range between number_3 and number_4 to a max of 200
                tableSizeConstraint: {
                    firstElement: '#number_3',
                    secondElement: '#number_4',
                    maxDifference: 200
                }
            }
        },
        // error messages
        messages: {
            // displayed when rule evaluates false
            input_2: {
                tableSizeConstraint: "The difference between Multipliers must not exceed 200."
            },
            input_4: {
                tableSizeConstraint: "The difference between Multiplicands must not exceed 200."
            }
        },
        submitHandler: function(form, event) {
            // disable default form submit
            event.preventDefault();
            // get values from inputs
            var inputs = [
                parseInt($('#number_1').val(), 10),
                parseInt($('#number_2').val(), 10),
                parseInt($('#number_3').val(), 10),
                parseInt($('#number_4').val(), 10)
            ];
            generateTableMatrix(inputs);
        }
    });

});


