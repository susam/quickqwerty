/*
The MIT License (MIT)

Copyright (c) 2008-2019 Susam Pal

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var Tutor = function() {

    'use strict'

    var VERSION = '1.0.1-dev'

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

            // Element to display guide link
            guideLink: null,

            // Element to display guide for the current unit
            guide: null,

            // Element that contains previous and next links along with
            // the practice pane
            practicePanelWrapper: null,

            // Element that contains all the practice elements
            practicePane: null,

            // Element that displays the link to the previous subunit
            previousLink: null,

            // Element that displays the link to the next subunit
            nextLink: null,

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

            // Time elapsed since the first character was typed by the
            // user
            timeElapsed: 0,

            // Current typing speed of the user in words per minute
            wpm: 0,

            // Current typing speed of the user in characters per minute
            cpm: 0,

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
        showPracticePanelWrapper()
        updateUnitFromURL()
        hideGuide()

        // Event handlers
        window.onhashchange = processURLChange
        my.html.input.onkeyup = updatePracticePane
        guideLink.onclick = toggleGuide
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
    //   key, value, ... -- An even number of string arguments
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
        Util.removeChildren(linksDiv)

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
            Util.addChildren(spanElement, label)
            divElement.appendChild(spanElement)

            divElement.className = 'selected'
        } else {
            var anchorElement = document.createElement('a')
            anchorElement.href = href
            Util.addChildren(anchorElement, label)

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


    // Check if the current unit is the first subunit among all the
    // subunits.
    //
    // Return:
    //   true if the current subunit is the first subunit;
    //   false otherwise
    function currentSubunitIsTheFirstSubunit()
    {
        return my.current.unitNo == 1 && my.current.subunitNo == 1
    }


    // Check if the current subunit is the last subunit among all the
    // subunits.
    //
    // Return:
    //   true if the current subunit is the last subunit;
    //   false otherwise
    function currentSubunitIsTheLastSubunit()
    {
        return my.current.unitNo == Units.main.length &&
               my.current.subunitNo == my.current.subunitTitles.length
    }


    // Go to previous subunit.
    //
    // Do nothing if the user is already at the first subunit of the
    // first unit.
    function previousSubunit()
    {
        var m = my.current.unitNo
        var n = my.current.subunitNo

        if (!currentSubunitIsTheFirstSubunit()) {
            if (n == 1) {
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

        if (!currentSubunitIsTheLastSubunit()) {
            if (n == my.current.subunitTitles.length) {
                // If the user is at unit M.L where L is the last
                // subunit of unit M, then go to unit (M + 1).1.
                m++
                n = 1
            } else {
                // If the user is at unit M.N, then go to unit M.(N + 1).
                n++
            }
        }

        window.location.href = unitHref(m, n)
    }


    // Hide typing guide
    function hideGuide()
    {
        guide.style.display = 'none'
        Util.setChildren(guideLink, 'Guide')
        return false
    }


    // Display typing guide
    function showGuide()
    {
        guide.style.display = ''
        Util.setChildren(guideLink, 'Hide Guide')
        return false
    }


    // Hide typing guide if it is already displayed.
    // Show typing guide if it is hidden.
    function toggleGuide()
    {
        if (guide.style.display == 'none') {
            return showGuide()
        } else {
            return hideGuide()
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
        updateNavigationLinks()
        updateProgressTooltip()

        displayUnitTitle()
        displayGuide()

        resetSubunit()
    }


    // Update the visibility of the navigation links to the previous and
    // the next subunits. Hide the link to the previous subunit when the
    // user is at the first subunit. Hide the link to the next
    // subunit when the user is already at the last subunit. Display
    // both links otherwise.
    function updateNavigationLinks()
    {
        if (currentSubunitIsTheFirstSubunit()) {
            my.html.previousLink.style.visibility = 'hidden'
            my.html.nextLink.style.visibility = 'visible'
        } else if (currentSubunitIsTheLastSubunit()) {
            my.html.previousLink.style.visibility = 'visible'
            my.html.nextLink.style.visibility = 'hidden'
        } else {
            my.html.previousLink.style.visibility = 'visible'
            my.html.nextLink.style.visibility = 'visible'
        }
    }


    // Display the number of characters in the current lesson as a
    // tooltip for progress bar and progress percent.
    function updateProgressTooltip()
    {
        my.html.progress.title =
                'This lesson contains ' + my.current.subunitText.length +
                ' characters.'
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
        Util.removeChildren(alternateUnitLinks)

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
        var newUnit
        var confirmMessage

        if (my.settings.unit == my.UNIT.MAIN) {
            newUnit = my.UNIT.ALTERNATE
            confirmMessage = Units.alternateConfirmMessage
        } else {
            newUnit = my.UNIT.MAIN
            confirmMessage = Units.mainConfirmMessage
        }

        if (!confirm(confirmMessage)) {
            return false
        }

        localStorage.unit = newUnit
        loadSettings()
        updateUnitFromURL()
        return false
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

        log('state', my.current.state.toUpperCase(),
            'unit', my.current.unitNo + '.' + my.current.subunitNo,
            'type', my.settings.unit)

        updatePracticePaneState()
        updatePracticePane()
        clearAdvice()
        clearResultTooltips()
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
        var space = '\u00a0\u00a0'
        var title = '[' + my.current.unit.title + ']'

        Util.setChildren(my.html.unitTitle, unitNo, space, title)
    }


    // Display guide for the current unit.
    function displayGuide() {
       my.html.guide.innerHTML = my.current.unit.guide
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
        my.current.targetPrefix = Util.visual(s)

        // Select target character
        if (i < textLength) {
            s = my.current.subunitText.charAt(i)
            my.current.targetChar = Util.visual(s)
        } else {
            my.current.targetChar = ''
        }

        // Select suffix string
        s = my.current.subunitText.substring(i + 1, endIndex)
        my.current.targetSuffix = Util.visual(s)
    }


    // Display the current target text
    function displayTargetText()
    {
        // Create target character element
        var targetCharElement = document.createElement('span')
        var targetChar = document.createTextNode(my.current.targetChar)
        targetCharElement.className = 'targetChar'
        targetCharElement.appendChild(targetChar)

        // Set new target text
        Util.setChildren(my.html.target, my.current.targetPrefix,
                                         targetCharElement,
                                         my.current.targetSuffix)
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

        if (my.current.state == my.STATE.COMPLETED) {
            displayAdvice()
            setResultTooltips()

            log('state', my.current.state.toUpperCase(),
                'unit', my.current.unitNo + '.' + my.current.subunitNo,
                'type', my.settings.unit,
                'wpm', my.current.wpm,
                'error', my.current.errorRate.toFixed(1))
        }
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
                processInputCommand()
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
                my.html.input.focus()
                Util.setChildren(my.html.status, 'READY')
                my.html.status.title = 'Type in the input box below ' +
                                       'to begin this lesson.'
                my.html.restartLink.style.visibility = 'hidden'
                break

            case my.STATE.RUNNING:
                my.html.practicePane.className = ''
                my.html.input.disabled = false
                my.html.input.focus()
                Util.setChildren(my.html.status, '')
                my.html.status.title = ''
                my.html.restartLink.style.visibility = 'visible'
                break

            case my.STATE.ERROR:
                my.html.practicePane.className = 'error'
                my.html.input.disabled = false
                my.html.input.focus()
                my.html.restartLink.style.visibility = 'visible'
                Util.setChildren(my.html.status, 'ERROR!')
                my.html.status.title = 'Fix errors in the input box ' +
                                       'by pressing the backspace key.'
                break

            case my.STATE.COMPLETED:
                my.html.practicePane.className = 'completed'
                my.html.input.disabled = true
                my.html.input.blur()
                my.html.restartLink.style.visibility = 'visible'
                Util.setChildren(my.html.status, 'COMPLETED')
                my.html.status.title = 'You have completed this lesson.'
                break
        }

    }


    // Clear advice.
    function clearAdvice()
    {
        Util.removeChildren(my.html.remark)
        Util.removeChildren(my.html.advice)
    }


    // Update remark and advice link according to the current state of
    // the tutor and the performance of the user.
    function displayAdvice()
    {
        // Calculate error rate (in percent)
        var error = Math.round(my.current.errorRate)

        var repeatSubunit = error > 0

        // Update remark and advice
        var anchorElement = document.createElement('a')
        if (repeatSubunit) {
            Util.addChildren(my.html.remark, 'Reduce error')
            my.html.remark.title = 'Your error rate should not ' +
                                   'exceed 0%.'

            Util.addChildren(anchorElement, 'Try again')
            anchorElement.href = '#restart'
            anchorElement.title = 'Please practice this lesson again.'
        } else {
            Util.addChildren(my.html.remark, 'Well done!')
            my.html.remark.title = 'You have satisfactorily ' +
                                   'completed this lesson.'

            Util.addChildren(anchorElement, 'Next lesson')
            anchorElement.href = '#next'
            anchorElement.title = 'Please proceed with the next lesson.'
        }

        // Do not display 'Next lesson' advice if the user is at the
        // last subunit; display advice otherwise
        if (repeatSubunit || !currentSubunitIsTheLastSubunit()) {
            my.html.advice.appendChild(anchorElement)
            anchorElement.focus()
        }
    }


    // Update progress bar.
    function updateProgress()
    {
        var goodChars = my.current.correctInputLength
        var textLength = my.current.subunitText.length

        var progress = Math.round(100 * goodChars / textLength)

        my.html.progressBar.value = progress
        Util.setChildren(my.html.progressPercent, progress + '%')
    }


    // Update the typing speed.
    function updateSpeed()
    {
        // WPM and CPM does not need to be calculated on error
        if (my.current.state == my.STATE.ERROR) {
            return
        }

        var goodChars = my.current.correctInputLength

        // Determine the time elapsed since the user began typing
        var currentTime = new Date().getTime()
        var timeElapsed = currentTime - my.current.startTime
        my.current.timeElapsed = timeElapsed

        // Calculate WPM and CPM
        var wpm
        if (timeElapsed == 0) {
            wpm = goodChars == 0 ? 0 : '\u221e'
        } else {
            wpm = Math.round(60000 * goodChars / 5 / timeElapsed)
            my.current.wpm = wpm
            my.current.cpm = Math.round(60000 * goodChars / timeElapsed)
        }

        // Display WPM
        Util.setChildren(my.html.speed, wpm + ' wpm')
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
            errorRate = '\u221e'
        } else {
            errorRate = Math.round(my.current.errorRate)
        }

        // Display error rate
        Util.setChildren(my.html.error, errorRate + '% error')
    }


    // Update the smiley to reflect the user's performance.
    function updateSmiley()
    {
        var errorRate = Math.round(my.current.errorRate)
        var smiley

        if (errorRate == 0) {
            if (my.current.wpm >= 40) {
                smiley = my.SMILEY.VERY_HAPPY
            } else {
                smiley = my.SMILEY.HAPPY
            }
        } else if (errorRate > 0 && errorRate <= 2) {
            smiley = my.SMILEY.UNHAPPY
        } else {
            smiley = my.SMILEY.SAD
        }
        Util.setChildren(my.html.smiley, smiley)
    }


    // Clear the tooltips in the result pane.
    function clearResultTooltips()
    {
        my.html.speed.title = ''
        my.html.error.title = ''
    }

    // Set the tooltips in the result pane.
    function setResultTooltips()
    {
        var textLength = my.current.subunitText.length
        var charNoun = textLength == 1 ? 'character' : 'characters'

        // Speed tooltip
        my.html.speed.title =
                'You have typed ' + textLength + ' ' + charNoun +
                ' in\n' +
                Util.prettyTime(my.current.timeElapsed) + '.\n\n' +
                'Your typing speed is\n' +
                my.current.wpm + ' words per minute, or\n' +
                my.current.cpm + ' characters per minute.'


        // Error rate tooltip
        var errorRateTooltip
        var accuracyTooltip

        // Update error rate
        if (my.current.errorRate == Number.POSITIVE_INFINITY) {
            errorRateTooltip = '\u221e'
            accuracyTooltip = 0
        } else {
            errorRateTooltip = parseFloat(my.current.errorRate.toFixed(1))
            accuracyTooltip = 100 - errorRateTooltip
        }

        var errorNoun = my.current.errors == 1 ? 'error' : 'errors'

        var title =
                'You have typed ' + textLength + ' ' + charNoun +
                '.\n' +
                'You have made ' + my.current.errors + ' ' +
                errorNoun + '.\n' +
                'Your error rate is ' + errorRateTooltip + '%.\n' +
                'Your accuracy is ' + accuracyTooltip + '%.\n'

        my.html.error.title = title
    }


    // Process command entered by the user in the input textarea
    // element when the tutor is in error state. Once the tutor enters
    // the error state, the supported commands are searched at the end
    // of the erroneous input. If a supported command is found at the
    // end of the erroneous input, the command is processed.
    //
    // The following is a list of the supported commands:
    //   restart  restart the current subunit
    //   reset    same as the 'restart' command
    //   fix      remove errors from the input text
    //   xxx      same as the 'fix' command
    function processInputCommand()
    {
        var inputText = my.html.input.value
        var goodChars = my.current.correctInputLength

        if (inputCommandIs('restart') || inputCommandIs('rst')) {
            location.href = '#restart'
        } else if (inputCommandIs('fix') || inputCommandIs('xxx')){
            my.html.input.value = inputText.substring(0, goodChars)
            updatePracticePane()
        } else if (inputCommandIs('qtpi')) {
            qtpi()
        }
    }


    // Check if the input entered by the user contains the specified
    // command. The specified command is considered to be contained in
    // the input if the input ends with the specified command.
    //
    // Return:
    //   true if the specified command is present in the input;
    //   false otherwise
    function inputCommandIs(command)
    {
        var input = my.html.input.value
        return input.substring(input.length - command.length) == command
    }


    // Create an HTML element to display a pink heart and add it to the
    // HTML page.
    //
    // Return:
    //   HTML element with containing the heart
    function createHeart()
    {
        var span = document.createElement('span')

        span.style.position = 'absolute'
        span.style.color = '#f52887'
        span.style.opacity = '0'
        Util.addChildren(span, '\u2665')

        document.body.appendChild(span)
        return span
    }


    // Display growing hearts all over the page.
    function growingHearts()
    {
        var ox = 0
        var oy = 80

        var w = document.body.clientWidth - ox - 200
        var h = document.body.clientHeight - oy - 200

        var newInterval = Util.random(200, 2000)

        window.setInterval(function()
        {

            var heart = createHeart()
            heart.style.fontSize = '0%'
            heart.style.left = Util.random(ox, ox + w) + 'px'
            heart.style.top = Util.random(oy, oy + h) + 'px'

            var growInterval = Util.random(10, 50)
            var size = Util.random(200, 2000)
            var i = 0
            var id = window.setInterval(function()
            {
                i += 20
                heart.style.fontSize = i + '%'

                if (i < size / 2 ) {
                    heart.style.opacity = '1'
                } else {
                    heart.style.opacity = (1 - (2 * i - size) / size ) + ''
                }

                if (i >= size) {
                    window.clearInterval(id)
                    document.body.removeChild(heart)
                }
            }, growInterval)
        }, newInterval)
    }


    // Display hearts rising across the page
    function risingHearts()
    {
        var ox = 0
        var oy = 80

        var w = document.body.clientWidth - ox - 200
        var h = document.body.clientHeight - oy - 200

        var newInterval = Util.random(200, 2000)

        window.setInterval(function()
        {
            var x = Util.random(ox, ox + w)
            var y = Util.random(oy + h - 100, oy + h)

            var heart = createHeart()
            heart.style.fontSize = Util.random(100, 2000) + '%'
            heart.style.left = x + 'px'
            heart.style.top = y + 'px'

            var riseInterval = Util.random(10, 50)
            var rise = Util.random(h / 4, h)
            var drift = Util.random(-1, 1)
            var i = 0
            var id = window.setInterval(function()
            {
                i++
                if (Util.random(1, 100) <= 1) {
                    drift = (drift == Util.random(-1, 1) ? 1 : 0)
                }

                x = Math.min(Math.max(x + drift, ox), ox + w)

                heart.style.left = x + 'px'
                heart.style.top = (y - i) + 'px'

                if (i < rise / 4) {
                    heart.style.opacity = (4 * i / rise) + ''
                } else if (i < rise / 2 ) {
                    heart.style.opacity = '1'
                } else {
                    heart.style.opacity = (1 - (2 * i - rise) / rise ) + ''
                }

                if (i >= rise) {
                    window.clearInterval(id)
                    document.body.removeChild(heart)
                }
            }, riseInterval)
        }, newInterval)
    }


    // Return a message selected randomly or a message selected based on
    // time.
    //
    // Return:
    //   Randomly selected message
    function qtpiLetter()
    {
        var pLeft = '<p style="text-align: left">'
        var pCenter = '<p style="text-align: center">'
        var pRight = '<p style="text-align: right">'
        var pEnd = '</p>'

        var d = new Date()
        var meridiem = d.getHours() < 12 ? 'a.m.' : 'p.m.'

        if (d.getMinutes() == 14 && (d.getHours() == 3 ||
                                     d.getHours() == 15)) {

            return pLeft + 'Cutie Pai,' + pEnd + pCenter +
                   'Happy <big style="font-family: serif">&pi;</big> ' +
                   meridiem + pEnd + pRight + '&mdash; Susam' + pEnd
        }

        var letters = [
            pLeft + 'Cutie Pai,' + pEnd + pCenter +
            'I <span style="color: #f52887; font-size: 110%">&#x2764;' +
            '</span> U!' + pEnd + pRight + '&mdash; Susam' + pEnd,

            pLeft + 'Cutie Pai,' + pEnd + pCenter +
            'I <span style="color: #f52887; font-size: 130%">&hearts;' +
            '</span> U!' + pEnd + pRight + '&mdash; Susam' + pEnd,

            pLeft + 'Cutie Pai,' + pEnd + pCenter +
            'I love you! <span style="color: #f52887;">' +
            '<span style="font-size: 60%">&hearts;</span>' +
            '<span style="font-size: 100%">&hearts;</span></span>' +
            pEnd + pRight + '&mdash; Susam' + pEnd,

            pLeft + 'Cutie Pai,' + pEnd + pLeft +
            'Your smile is the most beautiful thing in the ' +
            'world to me. <big style="color: #a53364">&#x263a;</big>' +
            pEnd + pRight + '&mdash; Susam' + pEnd,

            pLeft + 'Cutie Pai,' + pEnd + pLeft +
            'Do you know why I got the tiny wine glass for you at ' +
            'Purple Haze?' + pEnd + pLeft +
            'Because I can go to any length to see you smile.' +
            pEnd + pRight + '&mdash; Susam' + pEnd,

            pLeft + 'Cutie Pai,' + pEnd + pCenter +
            'You make me want to be a better person.' +
            pEnd + pRight + '&mdash; Susam' + pEnd
        ]

        return Util.random(letters)
    }


    // Display letter.
    function qtpi()
    {
        // Hide content and sidebar
        document.getElementById('content').style.display = 'none'
        document.getElementById('sidebar').style.display = 'none'

        var letterDiv = document.createElement('div')
        letterDiv.style.width = '50%'
        letterDiv.style.marginLeft = 'auto'
        letterDiv.style.marginRight = 'auto'
        letterDiv.style.borderColor = '#2e0854'
        letterDiv.style.borderWidth = '5px'
        letterDiv.style.borderStyle = Util.random(['solid', 'double',
                                                   'ridge', 'groove'])
        var fontSize = 32
        letterDiv.style.fontSize = fontSize + 'px'
        letterDiv.style.lineHeight = (1.5 * fontSize) + 'px'
        letterDiv.style.paddingLeft = fontSize + 'px'
        letterDiv.style.paddingRight = fontSize + 'px'
        letterDiv.style.color = '#2e0854'
        Util.addChildren(letterDiv, qtpiLetter())

        var letter = qtpiLetter()
        letterDiv.innerHTML = letter

        var mainDiv = document.getElementById('main')
        mainDiv.appendChild(letterDiv)

        var verticalMargin = (window.innerHeight -
                              0.04 * window.innerWidth -
                              letterDiv.offsetHeight - 160) / 2

        if (verticalMargin <= 20) {
            verticalMargin = '2%'
        } else {
            verticalMargin = Math.round(verticalMargin) + 'px'
        }

        letterDiv.style.marginTop = verticalMargin
        letterDiv.style.marginBottom = verticalMargin

        Util.random([growingHearts, risingHearts, function(){}])()
        log('qtpi', letter.replace(/(<([^>]+)>)/ig, ' '))
    }


    // Tutor object
    return {
        VERSION: VERSION,
        init: init,
        setLogFunction: setLogFunction
    }
}()
