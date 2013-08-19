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
        //
        // The property names in this object should match the ID of the
        // corresponding HTML elements. This properties would be
        // automatically set to the corresponding HTML element in the
        // init function.
        html: {
            // Element to display all unit numbers
            unitLinks: null,

            // Element to display all subunit titles
            subunitLinks: null,

            // Element to display the title of the current unit
            unitTitle: null,

            // Element to display links for main and alternate units
            alternateUnitLinks: null,

            // Element to display tips link
            tipsLink: null,

            // Element to display tips for the current unit
            tips: null,

            // Element that contains previous and next links along with
            // the practice pane
            practicePanelWrapper: null,

            // Element that contains all the practice elements
            practicePane: null,

            // Element to display the target text to be typed by the
            // user
            target: null,

            // Element where the user types the target text
            input: null,

            // Element where the status of the tutor is showed
            status: null,

            // Element where a remark about the user's performance is
            // shown after the complete subunit text is typed
            remark: null,

            // Element where the next step is suggested as a link to the
            // user after the complete subunit text is typed
            advice: null,

            // Element that contains the progress bar and the progress
            // percent text
            progress: null,

            // Progress bar to display how much of the target text has
            // been correctly typed by the user
            progressBar: null,

            // Element to display how much of the target text has
            // been correctly typed by the user in percent
            progressPercent: null,

            // Element to display the subunit restart link
            restartLink: null,

            // Element to display the typing speed
            speed: null,

            // Element to display the errors made by the user in percent
            error: null,

            // Element to display a smiley to reflect the user's
            // performance
            smiley: null
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

            // Current typing speed of the user in words per minute
            wpm: 0,

            // Errors made by the user expressed in percent
            errorRate: 0,

            // Current state of the tutor
            state: null
        },

        // User settings
        settings: {
            // Type of unit
            unit: '',
        },

        // Logging function
        logFunction: null,

        // Possible type of units
        UNIT: {
            MAIN: 'main',
            ALTERNATE: 'alternate'
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
        },

        // Smileys to display the performance of the user
        SMILEY: {
            VERY_HAPPY: '(\uff61\u0298\u203f\u0298\uff61)',

            HAPPY: '(\u0298\u203f\u0298)',

            UNHAPPY: '(\u2299_\u2299)',

            WORRIED: '(\u2299\ufe4f\u2299)',

            SAD: '(\u2299\u2054\u2299)'
        }
    }


    // Initialize the typing tutor
    function init()
    {
        // Get all necessary HTML elements
        for (var elementID in my.html) {
            my.html[elementID] = document.getElementById(elementID)
        }

        // Get user settings
        resetSettings()
        loadSettings()

        // Initialize the user interface
        updateUnitFromURL()
        showPracticePanelWrapper()
        hideTips()

        // Event handlers
        window.onhashchange = processURLChange
        my.html.input.onkeyup = updatePracticePane
        tipsLink.onclick = toggleTips
    }


    // Set the logging function to be called to write logs.
    //
    // Argument:
    //   logFunction -- Logging function
    function setLogFunction(logFunction)
    {
        my.logFunction = logFunction
    }


    // Write logs via a configured logging function.
    //
    // Arguments:
    //   key, value, ... -- An event number of string arguments
    function log()
    {
        if (my.logFunction == null)
            return

        var meta = ['name', 'QuickQWERTY']
        var data = Array.prototype.slice.call(arguments)
        my.logFunction.apply(this, meta.concat(data))
    }


    // Reset the user settings in my.settings to default values.
    function resetSettings()
    {
        my.settings.unit = my.UNIT.MAIN
    }


    // Load settings from local storage to my.settings object.
    function loadSettings()
    {
        if (typeof localStorage.unit != 'undefined') {
            my.settings.unit = localStorage.unit
        }
    }


    // Return unit number m.
    //
    // Argument:
    //   m -- Unit number
    //
    // Return:
    //   Unit object
    function unit(m)
    {
        if (alternateUnitAvailable(m) &&
            my.settings.unit == my.UNIT.ALTERNATE) {
            return Units.alternate[m - Units.alternateStart]
        } else {
            return Units.main[m - 1]
        }
    }


    // Return true if an alternate unit is available for unit number m.
    //
    // Argument:
    //   m -- Unit number
    //
    // Return:
    //   true if an alternate unit is available; false otherwise
    function alternateUnitAvailable(m)
    {
        if (m >= Units.alternateStart &&
            m < Units.alternateStart + Units.alternate.length) {
            return true
        } else {
            return false
        }
    }


    // Display practice panel
    function showPracticePanelWrapper()
    {
        my.html.practicePanelWrapper.style.display = 'inline-block'
    }


    // Display the unit links
    function displayUnitLinks()
    {
        // Delete all existing unit links
        var linksDiv = my.html.unitLinks
        while (linksDiv.firstChild) {
            linksDiv.removeChild(linksDiv.firstChild)
        }

        // Create new unit links
        for (var i = 0; i < Units.main.length; i++) {
            var label = 'Unit ' + (i + 1)
            var selected = (i + 1 == my.current.unitNo)
            var href = unitHref(i + 1)

            var divElement = boxedLink(label, selected, href)
            divElement.id = 'unit' + (i + 1)
            divElement.title = unit(i + 1).title

            linksDiv.appendChild(divElement)
        }
    }


    // Create an HTML div element containing a label if the div element
    // is specified as selected, and/or a hyperlink if the div element
    // is specified as not selected.
    //
    // Arguments:
    //   label -- Label to be displayed inside the div element
    //   selected -- Whether the div element should be marked selected
    //   href -- Fragment identifier for the link to be created
    //   clickHandler -- Function to be invoked when the link is clicked
    //
    // Return:
    //   HTML div element with the label and/or link
    function boxedLink(label, selected, href, clickHandler)
    {
        var divElement = document.createElement('div')

        if (selected) {
            var spanElement = document.createElement('span')
            spanElement.innerHTML = label
            divElement.appendChild(spanElement)

            divElement.className = 'selected'
        } else {
            var anchorElement = document.createElement('a')
            anchorElement.href = href
            anchorElement.innerHTML = label

            if (typeof clickHandler != 'undefined') {
                anchorElement.onclick = clickHandler
            }

            divElement.appendChild(anchorElement)
        }

        return divElement
    }


    // Return fragment identifier to be used in URL for the specified
    // unit and subunit.
    //
    // Arguments:
    //   m -- Unit number (number)
    //   n -- Subunit number (number)
    //
    // Return value:
    //   Fragment identifier to be used in URL (string)
    function unitHref(m, n)
    {
        if (typeof m == 'undefined') {
            return ''
        } else if (typeof n == 'undefined') {
            return '#' + m
        } else {
            return '#' + m + '.' + n
        }
    }


    // Process the current URL and perform appropriate tasks.
    //
    // This function is called automatically when the fragment
    // identifier in the current URL changes.
    function processURLChange()
    {
        switch(window.location.hash) {

            case '#restart':
                currentSubunit()
                break

            case '#previous':
                previousSubunit()
                break

            case '#next':
                nextSubunit()
                break

            default:
                updateUnitFromURL()
        }
    }


    // Go to current subunit.
    function currentSubunit()
    {
        var m = my.current.unitNo
        var n = my.current.subunitNo

        window.location.href = unitHref(m, n)
    }


    // Go to previous subunit.
    //
    // Do nothing if the user is already at the first subunit of the
    // first unit.
    function previousSubunit()
    {
        var m = my.current.unitNo
        var n = my.current.subunitNo

        if (m == 1 && n == 1) {
            // If the user is at unit 1.1, there is no further
            // previous unit to go to.
            return
        } else if (n == 1) {
            // If the user is at unit M.1, go to unit (M - 1).L
            // where L is the last subunit of the previous unit.
            previousUnit = unit(m - 1)
            var previousSubunitTitles = []
            for (var subunitTitle in previousUnit.subunits) {
                previousSubunitTitles.push(subunitTitle)
            }

            m--
            n = previousSubunitTitles.length
        } else {
            // If the user is at unit M.N, go to unit M.(N - 1)
            n--
        }
        window.location.href = unitHref(m, n)
    }


    // Go to next subunit.
    //
    // Do nothing if the user is already at the last subunit of the last
    // unit.
    function nextSubunit()
    {
        var m = my.current.unitNo
        var n = my.current.subunitNo

        if (m == Units.main.length &&
            n == my.current.subunitTitles.length) {
            // If the user is at the last subunit, there is no further
            // unit to go to.
            return
        } else if (n == my.current.subunitTitles.length) {
            // If the user is at unit M.L where L is the last subunit of
            // unit M, then go to unit (M + 1).1.
            m++
            n = 1
        } else {
            // If the user is at unit M.N, then go to unit M.(N + 1).
            n++
        }
        window.location.href = unitHref(m, n)
    }

    
    // Hide typing tips
    function hideTips()
    {
        tips.style.display = 'none'
        tipsLink.innerHTML = 'Help'
        return false
    }


    // Display typing tips
    function showTips()
    {
        tips.style.display = ''
        tipsLink.innerHTML = 'Hide Help'
        return false
    }


    // Hide typing tips if they are already displayed.
    // Show typing tips if they are hidden.
    function toggleTips()
    {
        if (tips.style.display == 'none') {
            return showTips()
        } else {
            return hideTips()
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
        var unitNo = 1
        var subunitNo = 1

        // Parse the fragment identifier in the URL and determine the
        // unit
        if (window.location.hash.length > 0) {
            var fragmentID = window.location.hash.slice(1)
            var tokens = fragmentID.split('.')
            unitNo = parseInt(tokens[0])
            if (tokens.length > 1)
                subunitNo = parseInt(tokens[1])
        }

        // Default to unit 1 if unit number could not be parsed
        // correctly from the URL
        if (isNaN(unitNo)) {
            unitNo = 1
        }

        // Default to subunit 1 if unit number could not be parsed
        // correctly from the URL
        if (isNaN(subunitNo)) {
            subunitNo = 1
        }

        setSubunit(unitNo, subunitNo)

        displayUnitLinks()
        displaySubunitLinks()
        displayAlternateUnitLinks()
        selectUnitAndSubunit()

        displayUnitTitle()
        displayTips()

        resetSubunit()
    }


    // Display alternate unit links for units which alternate units are
    // available. Display nothing otherwise.
    function displayAlternateUnitLinks()
    {
        // If alternate unit is not available for the current unit,
        // hide the alternate links element
        if (!alternateUnitAvailable(my.current.unitNo)) {
            alternateUnitLinks.style.visibility = 'hidden'
            return
        }

        // Delete all existing alternate unit links
        while (alternateUnitLinks.firstChild) {
            alternateUnitLinks.removeChild(alternateUnitLinks.firstChild)
        }

        // Create div elements for the main unit and alternate unit
        var mainUnitElement =
                boxedLink(Units.mainLabel,
                          my.settings.unit == my.UNIT.MAIN,
                          '#', toggleUnit)

        var alternateUnitElement =
                boxedLink(Units.alternateLabel,
                          my.settings.unit == my.UNIT.ALTERNATE,
                          '#', toggleUnit)

        alternateUnitLinks.appendChild(mainUnitElement)
        alternateUnitLinks.appendChild(alternateUnitElement)
        alternateUnitLinks.style.visibility = 'visible'
    }


    // Toggle between main unit and alternate unit
    function toggleUnit()
    {
        if (my.settings.unit == my.UNIT.MAIN) {
            localStorage.unit = my.UNIT.ALTERNATE
        } else {
            localStorage.unit = my.UNIT.MAIN
        }

        loadSettings()
        updateUnitFromURL()
        return false
    }


    // Mark the current unit and current subunit elements as selected.
    function selectUnitAndSubunit()
    {
        var unitID = 'unit' + my.current.unitNo
        var unitDiv = document.getElementById(unitID)
        unitDiv.className = 'selected'

        var subunitID = 'subunit' + my.current.subunitNo
        var subunitDiv = document.getElementById(subunitID)
        subunitDiv.className = 'selected'
    }


    // Reset the state of the current subunit.
    //
    // The following activities are performed while resetting the state
    // of the current subunit.
    //   1. Set the state of the tutor to READY.
    //   2. Set the number of errors made to 0.
    //   3. Clear the input textarea element.
    function resetSubunit()
    {
        my.current.state = my.STATE.READY
        my.current.errors = 0
        my.html.input.value = ''
        my.html.input.focus()

        log('state', my.current.state.toUpperCase(),
            'unit', my.current.unitNo + '.' + my.current.subunitNo,
            'type', my.settings.unit)

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

        my.current.unit = unit(m)

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

            var label = my.current.subunitTitles[i]
            var selected = (i + 1 == my.current.subunitNo)
            var href = unitHref(my.current.unitNo, i + 1)

            var subunitDiv = boxedLink(label, selected, href)
            subunitDiv.id = 'subunit' + (i + 1)
            subunitDiv.style.width = (95 / numberOfSubunits) + '%'

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
        updateProgress()
        updateSpeed()
        updateError()
        updateSmiley()
    }


    // Evaluate the input typed by the user and change the practice
    // panel state if necessary.
    function evaluateInput()
    {
        var inputText = my.html.input.value
        var inputLength = inputText.length

        // If the tutor is in READY state, and input has been entered,
        // then set it to RUNNING STATE.
        if (my.current.state == my.STATE.READY && inputLength > 0) {

            my.current.startTime = new Date().getTime()
            my.current.state = my.STATE.RUNNING
            updatePracticePaneState()

            log('state', my.current.state.toUpperCase(),
                'unit', my.current.unitNo + '.' + my.current.subunitNo,
                'type', my.settings.unit)
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
            } else if (my.current.state == my.STATE.ERROR) {
                if (inputText.substring(inputText.length - 4) == 'qtpi') {
                    qtpi()
                }
            }
        }

        // Update error rate
        if (goodChars == 0) {
            if (my.current.errors == 0) {
                my.current.errorRate = 0
            } else {
                my.current.errorRate = Number.POSITIVE_INFINITY
            }
        } else {
            my.current.errorRate = 100 * my.current.errors / goodChars
        }

        // Check if the complete target text has been typed successfully
        if (goodChars == my.current.subunitText.length) {
            my.current.state = my.STATE.COMPLETED
            updatePracticePaneState()

            log('state', my.current.state.toUpperCase(),
                'unit', my.current.unitNo + '.' + my.current.subunitNo,
                'type', my.settings.unit,
                'wpm', my.current.wpm,
                'error', my.current.errorRate.toFixed(1))
        }
    }


    // Update the state of the practice pane according to the current
    // state of the unit.
    function updatePracticePaneState()
    {
        switch (my.current.state) {

            case my.STATE.READY:
                my.html.practicePane.className = ''
                my.html.input.disabled = false
                my.html.status.innerHTML = 'READY'
                my.html.restartLink.style.visibility = 'hidden'
                break

            case my.STATE.RUNNING:
                my.html.practicePane.className = ''
                my.html.input.disabled = false
                my.html.status.innerHTML = ''
                my.html.status.title = ''
                my.html.restartLink.style.visibility = 'visible'
                break

            case my.STATE.ERROR:
                my.html.practicePane.className = 'error'
                my.html.input.disabled = false
                my.html.restartLink.style.visibility = 'visible'
                my.html.status.innerHTML = 'ERROR!'
                break

            case my.STATE.COMPLETED:
                my.html.practicePane.className = 'completed'
                my.html.input.disabled = true
                my.html.restartLink.style.visibility = 'visible'
                my.html.status.innerHTML = 'COMPLETED'
                break
        }

        updateRemarkAndAdvice()
    }


    // Update remark and advice link according to the current state of
    // the tutor and the performance of the user.
    function updateRemarkAndAdvice()
    {
        // Remark and advice is displayed only when the current subunit
        // text has been typed completely.
        if (my.current.state != my.STATE.COMPLETED) {

            my.html.remark.innerHTML = ''
            while (my.html.advice.firstChild) {
                my.html.advice.removeChild(my.html.advice.firstChild)
            }

            return
        }

        // Calculate error rate (in percent)
        var error = Math.round(my.current.errorRate)

        // Update remark and advice
        var anchorElement = document.createElement('a')
        if (error > 0) {
            my.html.remark.innerHTML = 'Reduce error'
            my.html.remark.title = 'Your error rate should not ' +
                                   'exceed 0%.'

            anchorElement.href = '#restart'
            anchorElement.innerHTML = 'Try again'
            anchorElement.title = 'Please practice this lesson again.'
        } else {
            my.html.remark.innerHTML = 'Well done!'
            my.html.remark.title = 'You have satisfactorily ' +
                                   'completed this lesson.'

            anchorElement.href = '#next'
            anchorElement.innerHTML = 'Next lesson'
            anchorElement.title = 'Please proceed with the next lesson.'
        }
        my.html.advice.appendChild(anchorElement)
    }


    // Update progress bar.
    function updateProgress()
    {
        var goodChars = my.current.correctInputLength
        var textLength = my.current.subunitText.length

        var progress = Math.round(100 * goodChars / textLength)

        my.html.progressBar.value = progress
        my.html.progressPercent.innerHTML = progress + '%'

        var charNoun = textLength == 1 ? 'character' : 'characters'

        my.html.progress.title =
                'You have typed ' + goodChars + ' out of ' +
                textLength + ' ' + charNoun + '.'
                                 
    }


    // Update the typing speed.
    function updateSpeed()
    {
        // CPM and WPM does not need to be updated on error
        if (my.current.state == my.STATE.ERROR) {
            return
        }

        var goodChars = my.current.correctInputLength

        // Determine the time elapsed since the user began typing
        var currentTime = new Date().getTime()
        var timeElapsed = (currentTime - my.current.startTime) / 60000

        // Update CPM and WPM
        var wpm
        var wpmInfo
        var cpmInfo
        if (timeElapsed == 0) {
            if (goodChars == 0) {
                wpm = 0
                wpmInfo = 0
                cpmInfo = 0
            } else {
                wpm = '&infin;'
                wpmInfo = '\u221e'
                cpmInfo = '\u221e'
            }
        } else {
            wpm = Math.round(goodChars / 5 / timeElapsed)
            my.current.wpm = wpm
            wpmInfo = wpm
            cpmInfo = Math.round(goodChars / timeElapsed)
        }

        my.html.speed.innerHTML = wpm + ' wpm'
        my.html.speed.title = 'Your typing speed is\n' +
                            wpmInfo + ' words per minute, or\n' +
                            cpmInfo + ' characters per minute.'
    }
        

    // Update the error rate.
    function updateError()
    {
        var goodChars = my.current.correctInputLength

        var errorRate
        var errorRateTooltip
        var accuracyTooltip

        // Update error rate
        if (my.current.errorRate == Number.POSITIVE_INFINITY) {
            errorRate = '&infin; '
            errorRateTooltip = '\u221e'
            accuracyTooltip = 0
        } else {
            errorRate = Math.round(my.current.errorRate)
            errorRateTooltip = parseFloat(my.current.errorRate.toFixed(1))
            accuracyTooltip = 100 - errorRateTooltip
        }

        my.html.error.innerHTML = errorRate + '% error'

        var charNoun = goodChars == 1 ? 'character' : 'characters'
        var errorNoun = my.current.errors == 1 ? 'error' : 'errors'

        var title =
                'You have typed ' + goodChars + ' ' + charNoun +
                ' correctly.\n' +
                'You have made ' + my.current.errors + ' ' +
                errorNoun + '.\n'

        if (my.current.state != my.STATE.READY) {
            title += 'Your error rate is ' + errorRateTooltip + '%.\n' +
                     'Your accuracy is ' + accuracyTooltip + '%.\n'
        }

        my.html.error.title = title
    }


    // Update the smiley to reflect the user's performance.
    function updateSmiley()
    {
        var errorRate = Math.round(my.current.errorRate)

        if (errorRate == 0) {
            if (my.current.wpm >= 40) {
                my.html.smiley.innerHTML = my.SMILEY.VERY_HAPPY
            } else {
                my.html.smiley.innerHTML = my.SMILEY.HAPPY
            }
        } else if (errorRate > 0 && errorRate <= 2) {
            my.html.smiley.innerHTML = my.SMILEY.UNHAPPY
        } else if (errorRate > 2 && errorRate <= 5) {
            my.html.smiley.innerHTML = my.SMILEY.WORRIED 
        } else {
            my.html.smiley.innerHTML = my.SMILEY.SAD
        }
    }


    // Return a letter selected randomly
    function qtpiLetter()
    {
        var letters = [
            '<p style="text-align: left">Cutie Pai,</p>' +
            '<p>I <big style="color: #f52887">&hearts;</big> U.</p>' +
            '<p style="text-align: right">&mdash; Susam</p>',

            '<p style="text-align: left">Cutie Pai,</p>' +
            '<p>Your smile is the most beautiful thing in the world ' +
            'to me. <big style="color: #e56394">&#x263a;</big></p>' +
            '<p style="text-align: right">&mdash; Susam</p>',

            '<p style="text-align: left">Cutie Pai,</p>' +
            '<p>Do you know why I got the tiny wine glass ' +
            'for you at Purple Haze?</p>' +
            '<p>Because I can go to any length to see you smile.</p>' +
            '<p style="text-align: right">&mdash; Susam</p>',

            '<p style="text-align: left">Cutie Pai,</p>' +
            '<p>You make me want to be a better person.</p>' +
            '<p style="text-align: right">&mdash; Susam</p>'
        ]

        return letters[Math.floor(Math.random() * letters.length)]
    }


    // Letter
    function qtpi()
    {
        var mainDiv = document.getElementById('main')
        var contentDiv = document.getElementById('content')
        var sidebarDiv = document.getElementById('sidebar')
        contentDiv.style.display = 'none'
        sidebarDiv.style.display = 'none'

        var borderWidth = (Math.floor(Math.random() * 4) + 1) + 'px'
        var borderStyles = ['dotted', 'dashed', 'solid', 'double',
                            'groove', 'ridge', 'inset', 'outset']
        var borderStyle = borderStyles[Math.floor(Math.random() *
                                                  borderStyles.length)]

        var letterDiv = document.createElement('div')
        letterDiv.id = 'qtpi'
        letterDiv.style.width = '50%'
        letterDiv.style.marginTop = '10%'
        letterDiv.style.marginBottom = '10%'
        letterDiv.style.marginLeft = 'auto'
        letterDiv.style.marginRight = 'auto'
        letterDiv.style.paddingLeft = '1em'
        letterDiv.style.paddingRight = '1em'
        letterDiv.style.borderColor = '#2e0854'
        letterDiv.style.borderWidth = borderWidth
        letterDiv.style.borderStyle = borderStyle
        letterDiv.style.textAlign = 'center'
        letterDiv.style.fontSize = '32px'
        letterDiv.style.lineHeight = '48px'
        letterDiv.innerHTML = qtpiLetter()

        mainDiv.appendChild(letterDiv)

        returnLink.onclick = function()
        {
            mainDiv.removeChild(letterDiv)
            contentDiv.style.display = ''
            sidebarDiv.style.display = ''
            return true
        }
    }


    // Tutor object
    return {
        init: init,
        setLogFunction: setLogFunction
    }
}()
