Changelog
=========

1.2.0 (2025-10-05)
------------------

### Changed

- Avoid redundant redirect to Unit 1.1 when it was the last practised
  lesson and the application is revisited without a location hash.

### Fixed

- Units 7.2 and 7.3 previously used the British spelling "tyre". This
  has been removed so that the lessons no longer include spelling
  specific to either American or British English.
- Units 9.2 and 9.3 misspelled the word "orwellian" as "orwelian" in
  the typing lessons.  This has been fixed.
- Unit 17.4 had the following sentence in the typing lesson: "89 is
  one more than 99."  This was factually incorrect.  This has been
  fixed to the following: "89 is one more than 88."
- In units 16 to 20, while switching between 5-6 split and 6-7 split,
  if the dialogue box confirming the switch was cancelled by pressing
  `Esc`, the switch still occurred.  This has been fixed now, so that
  if the dialogue is cancelled by pressing `Esc`, the switch does not
  occur.


1.1.0 (2025-09-28)
------------------

### Added

- Input command `reset` has been added as a synonym of `restart` and
  `rst`.

### Changed

- The entire application has been rewritten as a single standalone
  HTML file with no external dependencies.
- Words per minute (WPM) calculation no longer count the first
  character since the first character sets off the timer which means
  that the entry of the first character itself is not timed.
- Format keys to be pressed conspicuously in the guides.
- Guides are more detailed now with reminders to return the fingers to
  their original positions.
- The dialog box to confirm switching from 6-7 split style to 5-6
  split style and vice versa is now implemented with the HTML
  `<dialog>` element.
- When visiting the application page without a fragment identifier in
  the URL, the most recently practised lesson now loads by default.
- Typing lessons have been updated to avoid spellings specific to
  American English.
- Now licensed under the MIT License.

### Removed

- Removed previous and next links (`«` and `»` links) to navigate
  between lessons.  It served little purpose and made the user
  interface layout more complicated.  The advice link labelled "Next
  lesson" still exists and this can be used to move to the next lesson
  when the current lesson is completed satisfactorily.
- Tooltips that showed additional typing metrics have been removed.
  These features were obscure and not easily discoverable.
- Characters per minute (CPM) calculation has been removed since it
  was hidden away in a tooltip and it was not easily discoverable.


1.0.0 (2015-05-12)
------------------

### Added

- Display error message if JavaScript is not enabled in the web
  browser.
- Input commands `restart`, `rst`, `fix`, `xxx`.

### Changed

- Source code management and release management have moved from
  SourceForge to GitHub.
- Licensed under the Simplified BSD License (BSD-2-Clause).


0.4.0 (2010-05-23)
------------------

### Changed

- This is the final release on SourceForge.

### Fixed

- Ensure lessons do not use characters that have not been introduced yet.
- Fix an issue that caused the lessons bar to shrink in Google Chrome.


0.3.0 (2010-05-09)
------------------

### Added

- Support for both 5-6 split and 6-7 split typing.


0.2.0 (2010-03-07)
------------------

### Changed

- Keys `1` to `5` are now typed with the left hand and keys `6` to `0`
  are now typed with the right hand.
- Remove minimum speed requirement to move to the next lesson.


0.1.0 (2009-05-09)
------------------

### Added

- First release with the complete set of 21 units consisting of 101
  lessons.


### Changed

- Next lesson is suggested only when the current lesson is completed
  with a speed of at least 50 characters per minute.


0.0.6 (2008-12-21)
------------------

### Fixed

- Remove trailing commas removed from `db.js` since they are
  considered error in Internet Explorer 6 and 7.
- Fix an issue which which caused one extra unit to appear in the unit
  list while using the tool with Internet Explorer.


0.0.5 (2008-11-22)
------------------

### Added

- Initial draft with 15 units consisting of 73 lessons.
- Licensed under the GNU General Public License, version 3.
