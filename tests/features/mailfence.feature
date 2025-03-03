Feature: Mailfence e2e test

  Scenario Outline: Send and process email
    Given I am logging into the site using an existing account
    When I navigate to the Messages page
    And I create new message with <subjectRandom>, fill file <filePath> and send to myself
    And I navigate to Email list
    And I refresh Email list
    Then I should see the sent email with <subjectRandom> in my inbox
    And I open new email and save the file from the message to the "My Documents" folder
    And I navigate to the My Documents page
    And I refresh Documents page
    And I move the file to the Trash folder.
    And I go to Trash folder
    Then I should see the file with <fileName> in folder

    Examples:
      | subjectRandom   | filePath          | fileName |
      | AT_C2256_XXXXXX | /path/to/file.txt | file.txt |


