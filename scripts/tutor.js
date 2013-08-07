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

            // Element to display tips link
            tipsLink: null,

            // Element to display tips for the current unit
            tips: null,

            // Element that contains previous and next links along with
            // the practice pane
            practicePanel: null,

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
        for (var elementID in my.html) {
            my.html[elementID] = document.getElementById(elementID)
        }

        updateUnitFromURL()
        showPracticePanel()
        hideTips()

        window.onhashchange = processURLChange
        my.html.input.onkeyup = updatePracticePane
        tipsLink.onclick = toggleTips
    }


    // Display practice panel
    function showPracticePanel()
    {
        my.html.practicePanel.style.display = 'inline-block'
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
        for (var i = 0; i < units.length; i++) {
            var divElement = document.createElement('div')
            divElement.id = 'unit' + (i + 1)
            divElement.title = units[i].title

            var anchorElement = document.createElement('a')
            anchorElement.href = "#" + (i + 1)
            anchorElement.innerHTML = 'Unit ' + (i + 1)

            divElement.appendChild(anchorElement)
            linksDiv.appendChild(divElement)
        }
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
            previousUnit = units[m - 2]
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

        if (m == units.length && n == my.current.subunitTitles.length) {
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

        displayUnitLinks()
        displaySubunitLinks()
        selectUnitAndSubunit()

        displayUnitTitle()
        displayTips()

        resetSubunit()
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
            subunitDiv.id = 'subunit' + (i + 1)
            subunitDiv.style.width = (95 / numberOfSubunits) + '%'

            var anchor = document.createElement('a')
            anchor.href = unitHref(my.current.unitNo, i + 1)
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

        // This part of the code is executed only when a user has typed
        // a character. Therefore, if the tutor is in READY state, set
        // it to RUNNING STATE.
        if (my.current.state == my.STATE.READY) {

            my.current.startTime = new Date().getTime()
            my.current.state = my.STATE.RUNNING
            updatePracticePaneState()
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


    return {
        init: init
    }
}();
