/*
SIMPLIFIED BSD LICENSE

Copyright (c) 2013 Susam Pal
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:
    1. Redistributions of source code must retain the above copyright
       notice, this list of conditions and the following disclaimer.
    2. Redistributions in binary form must reproduce the above
       copyright notice, this list of conditions and the following
       disclaimer in the documentation and/or other materials provided
       with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


var Tutor = function()
{
    // Global object with tutor properties shared across all functions
    var my = {

        // HTML elements used by the tutor
        html: {
            // Element to display all unit numbers
            unitLinks: null,

            // Element to display all subunit titles
            subunitLinks: null,

            // Element to display the title of the current unit
            unitTitle: null,

            // Element to display tips for the current unit
            tips: null,

            // Element to display the target text to be typed by the
            // user
            target: null,

            // Element where the user types the target text
            input: null,

            // Progress bar to display how much of the target text has
            // been correctly typed by the user
            progressBar: null,

            // Element to display how much of the target text has
            // been correctly typed by the user in percent
            progressPercent: null,

            // Element to display the typing speed in characters per
            // minute
            cpm: null,

            // Element to display the typing speed in words per
            // minute
            wpm: null,

            // Element to display the errors made by the user in percent
            error: null,
        },

        // Current properties of the tutor
        current: {
            // Current unit number
            unitNo: 0,

            // Current subunit number
            subunitNo: 0,

            // Current unit object
            unit: null,

            // Names of the subunits of the current unit
            subunitTitles: [],

            // Subunit text for the current subunit
            subunitText: '',

            // Part of the subunit text visible in the target text just
            // before the target character
            targetPrefix: '',

            // Character in the target text to be typed immediately by
            // the user
            targetChar: '',

            // Part of the subunit text visible in the target text just
            // after the target character
            targetSuffix: '',

            // Timestamp (in milliseconds) at which the user began
            // typing the target text
            startTime: 0,

            // Number of errors made while typing the current subunit
            // text
            errors: 0,

            // Number of characters in the target text typed correctly
            // by the user
            correctInputLength: 0,

            // Current state of the tutor
            state: null
        },

        // Possible states the tutor can be in
        STATE: {
            // The tutor is ready to be used but the user has not
            // entered any input yet
            READY: "ready",

            // The user has entered input and there are no errors in the
            // input, or any errors that occurred have been deleted
            RUNNING: "running",

            // The user has entered input and there are errors in the
            // input
            ERROR: "error",

            // The user has completed the current subunit successfully
            COMPLETED: "completed"
        }
    }

    // Initialize the typing tutor
    function init()
    {
        my.html.unitLinks = document.getElementById('unitLinks')
        my.html.subunitLinks = document.getElementById('subunitLinks')
        my.html.unitTitle = document.getElementById('unitTitle')
        my.html.tips = document.getElementById('tips')
        my.html.target = document.getElementById('target')
        my.html.input = document.getElementById('input')
        my.html.progressBar = document.getElementById('progressBar')
        my.html.progressPercent = document.getElementById('progressPercent')
        my.html.cpm = document.getElementById('cpm')
        my.html.wpm = document.getElementById('wpm')
        my.html.error = document.getElementById('error')

        displayUnitLinks()
        updateUnitFromURL()

        my.html.input.onkeyup = updatePracticePane
        window.onhashchange = updateUnitFromURL
    }


    // Display the unit links
    function displayUnitLinks()
    {
        for (var i = 0; i < units.length; i++) {
            var divElement = document.createElement('div')
            divElement.className = 'unselected'
            divElement.id = 'unit' + (i + 1)

            var anchorElement = document.createElement('a')
            anchorElement.href = "#" + (i + 1)
            anchorElement.innerHTML = 'Unit ' + (i + 1)

            divElement.appendChild(anchorElement)
            my.html.unitLinks.appendChild(divElement)
        }
    }


    // Parse the current URL and determine the current unit and subunit
    // numbers, and display the determined subunit.
    //
    // The fragment identifier in the URL may contain the current unit
    // and subunit numbers in m.n format where m is the current unit
    // number and n is the current subunit number.
    //
    // If the fragment identifier is absent, then the current unit is 1
    // and the current subunit is 1.
    //
    // If the fragment identifier is a single integer m only, then the
    // current unit is m and the current subunit is 1.
    //
    // The following is a list of example URLs along with the unit
    // number they translate to.
    //
    //   http://quickqwerty.com/      -- Unit 1.1
    //   http://quickqwerty.com/#5    -- Unit 5.1
    //   http://quickqwerty.com/#5.1  -- Unit 5.1
    //   http://quickqwerty.com/#5.2  -- Unit 5.2
    function updateUnitFromURL()
    {
        // Default lesson is Unit 1.1
        var unit = 1
        var subunit = 1

        // Parse the fragment identifier in the URL and determine the
        // unit
        if (window.location.hash.length > 0) {
            var fragmentID = window.location.hash.slice(1)
            var tokens = fragmentID.split('.')
            unit = parseInt(tokens[0])
            if (tokens.length > 1)
                subunit = parseInt(tokens[1])
        }

        setSubunit(unit, subunit)

        displaySubunitLinks()
        displayUnitTitle()
        displayTips()

        resetSubunit()
    }


    // Reset the state of the current subunit.
    //
    // The following activities are performed while resetting the state
    // of the current subunit.
    //   1. Set the state of the tutor to READY.
    //   2. Clear the input textarea element.
    function resetSubunit()
    {
        my.current.state = my.STATE.READY
        my.html.input.value = ''
        my.html.input.focus()

        updatePracticePaneState()
        updatePracticePane()
    }


    // Set the tutor properties for the specified unit and subunit
    // numbers.
    //
    // Arguments:
    //   m -- Unit number
    //   n -- Subunit number
    function setSubunit(m, n)
    {
        my.current.unitNo = m
        my.current.subunitNo = n

        my.current.unit = units[m - 1]

        my.current.subunitTitles.length = 0
        for (var subunitTitle in my.current.unit.subunits) {
            my.current.subunitTitles.push(subunitTitle)
        }

        var subunitTitle = my.current.subunitTitles[n - 1]
        my.current.subunitText = my.current.unit.subunits[subunitTitle]
    }


    // Display the subunit links for the current unit.
    function displaySubunitLinks()
    {
        // Delete all existing subunit links
        var linksDiv = my.html.subunitLinks
        while (linksDiv.firstChild &&
               linksDiv.firstChild.className != 'stretch') {

            linksDiv.removeChild(linksDiv.firstChild)
        }

        // Create new subunit links for the unit m
        var numberOfSubunits = my.current.subunitTitles.length
        for (var i = numberOfSubunits - 1; i >= 0; i--) {
            // Insert whitespaces between div elements, otherwise they
            // would not be justified
            var whitespace = document.createTextNode('\n')
            linksDiv.insertBefore(whitespace, linksDiv.firstChild)

            var subunitDiv = document.createElement('div')
            subunitDiv.className = 'unselected'
            subunitDiv.id = 'subunit' + (i + 1)
            subunitDiv.style.width = (95 / numberOfSubunits) + '%'

            var anchor = document.createElement('a')
            anchor.href = '#' + my.current.unitNo + '.' + (i + 1)
            anchor.innerHTML = my.current.subunitTitles[i]

            subunitDiv.appendChild(anchor)
            linksDiv.insertBefore(subunitDiv, linksDiv.firstChild)
        }
    }


    // Display title for the current unit.
    function displayUnitTitle() {

        // Parts of the unit title
        var unitNo = 'Unit ' + my.current.unitNo +
                     '.' + my.current.subunitNo
        var title = '[' + my.current.unit.title + ']'

        // Create unit title nodes
        var unitNoText = document.createTextNode(unitNo)
        var whitespace = document.createTextNode('\u00a0\u00a0')
        var titleText = document.createTextNode(title)

        // Remove current unit title
        while (my.html.unitTitle.firstChild) {
            my.html.unitTitle.removeChild(my.html.unitTitle.firstChild)
        }

        // Add current unit title
        my.html.unitTitle.appendChild(unitNoText)
        my.html.unitTitle.appendChild(whitespace)
        my.html.unitTitle.appendChild(titleText)
    }


    // Display tips for the current unit.
    function displayTips() {
       my.html.tips.innerHTML = my.current.unit.tips
    }


    // Set the target text to be typed.
    //
    // The target text consits of three parts:
    //   1. Prefix
    //   2. Target character
    //   3. Suffix
    //
    // The target character is the character the user should type to
    // move ahead in the subunit. The prefix and the suffix offer some
    // context around the target character to be typed. These three
    // parts combined, in the specified order above, is a substring from
    // the subunit's text from units.js.
    function setTargetText() {

        // The target text should display at least one character
        var targetLength = Settings.TARGET_TEXT_LENGTH
        if (targetLength < 1) {
            targetLength = 1
        }

        // Length of the target text should be odd as equal number of
        // characters should be displayed on either side of the
        // character to be typed
        if (targetLength % 2 == 0) {
            targetLength--
        }

        // Number of characters on either side of the character to be
        // typed, assuming that the character to be typed is at the
        // centre
        var prefixLength = (targetLength - 1) / 2

        // Calculate the start index and the end index of the substring
        // to be selected from the subunit text to display as the target
        // text
        var i = my.current.correctInputLength
        var textLength = my.current.subunitText.length
        if (i <= prefixLength) {
            var startIndex = 0
        } else if (i >= textLength - 1 - prefixLength) {
            var startIndex = textLength - targetLength
        } else {
            var startIndex = i - prefixLength
        }
        var endIndex = startIndex + targetLength

        // Select prefix string
        var s = my.current.subunitText.substring(startIndex, i)
        my.current.targetPrefix = s.replace(/ /g, '\u00a0')

        // Select target character
        if (i < textLength) {
            my.current.targetChar = my.current.subunitText.charAt(i)
            if (my.current.targetChar == ' ') {
                my.current.targetChar = '\u00a0'
            }
        } else {
            my.current.targetChar = ''
        }

        // Select suffix string
        s = my.current.subunitText.substring(i + 1, endIndex)
        my.current.targetSuffix = s.replace(/ /g, '\u00a0')
    }


    // Display the current target text
    function displayTargetText()
    {
        // Create prefix and suffix nodes
        var prefix = document.createTextNode(my.current.targetPrefix)
        var suffix = document.createTextNode(my.current.targetSuffix)

        // Create target character element
        var target = document.createElement('span')
        var targetChar = document.createTextNode(my.current.targetChar)
        target.className = 'targetChar'
        target.appendChild(targetChar)

        // Remove current target text
        while (my.html.target.firstChild) {
            my.html.target.removeChild(my.html.target.firstChild)
        }

        // Add prefix, target character and suffix to the target text
        // element
        my.html.target.appendChild(prefix)
        my.html.target.appendChild(target)
        my.html.target.appendChild(suffix)
    }


    // Update practice pane after evaluating the user's input.
    //
    // The input typed by the user is evaluated for correctness and then
    // the practice pane is updated.
    function updatePracticePane()
    {
        evaluateInput()
        setTargetText()
        displayTargetText()
        updateResult()
    }


    // Evaluate the input typed by the user and change the practice
    // panel state if necessary.
    function evaluateInput()
    {
        var inputText = my.html.input.value
        var inputLength = inputText.length

        // If a user presses a modifier key such as Ctrl, Alt, etc. when
        // the input textarea is empty, this function is called and the
        // length of the input text is 0.
        if (inputLength == 0) {
            my.current.correctInputLength = 0
            return
        }

        // This part of the code is executed only when a user has typed
        // a character. Therefore, if the tutor is in READY state, set
        // it to RUNNING STATE.
        if (my.current.state == my.STATE.READY) {
            my.current.startTime = new Date().getTime()
            my.current.state = my.STATE.RUNNING
        }

        // Number of characters correctly typed by the user
        var goodChars = Util.common(my.current.subunitText, inputText)
        my.current.correctInputLength = goodChars

        // Validate the input
        if (goodChars == inputLength) {
            // Clear error if any
            if (my.current.state == my.STATE.ERROR) {
                my.current.state = my.STATE.RUNNING
                updatePracticePaneState()
            }
        } else {
            // Set and display error
            if (my.current.state == my.STATE.RUNNING) {
                my.current.state = my.STATE.ERROR
                my.current.errors++
                updatePracticePaneState()
            }
        }

        // Check if the complete target text has been typed successfully
        if (goodChars == my.current.subunitText.length) {
            my.current.state = my.STATE.COMPLETED
            updatePracticePaneState()
        }
    }


    // Update the state of the practice pane according to the current
    // state of the unit.
    function updatePracticePaneState()
    {
        switch (my.current.state) {

            case my.STATE.READY:
                my.html.target.className = ''
                my.html.input.className = ''
                my.html.input.disabled = false
                break

            case my.STATE.RUNNING:
                my.html.target.className = ''
                my.html.input.className = ''
                my.html.input.disabled = false
                break

            case my.STATE.ERROR:
                my.html.target.className = 'error'
                my.html.input.className = 'error'
                my.html.input.disabled = false
                break

            case my.STATE.COMPLETED:
                my.html.target.className = 'completed'
                my.html.input.className = 'completed'
                my.html.input.disabled = true
                break
        }
    }


    // Update the typing speed (displayed in CPM as well as WPM) and the
    // error percent.
    function updateResult()
    {
        var goodChars = my.current.correctInputLength

        // Update error rate
        var error = '&infin; '
        if (my.current.errors == 0) {
            error = 0
        } else if (goodChars > 0) {
            error = Math.round(100 * my.current.errors / goodChars)
        }
        my.html.error.innerHTML = error

        // CPM and WPM does not need to be updated on error
        if (my.current.state == my.STATE.ERROR) {
            return
        }

        // Determine the time elapsed since the user began typing
        var currentTime = new Date().getTime()
        var timeElapsed = (currentTime - my.current.startTime) / 60000

        // Update CPM and WPM
        var cpm = '&#infin;'
        var wpm = '&#infin;'
        if (timeElapsed > 0) {
            cpm = Math.round(goodChars / timeElapsed)
            wpm = Math.round(goodChars / 5 / timeElapsed)
        }
        my.html.cpm.innerHTML = cpm
        my.html.wpm.innerHTML = wpm 

        // Update progress bar
        var textLength = my.current.subunitText.length
        var progress = Math.round(100 * goodChars / textLength)
        my.html.progressBar.value = progress
        my.html.progressPercent.innerHTML = progress
    }
        

    return {
        init: init
    }
}();
