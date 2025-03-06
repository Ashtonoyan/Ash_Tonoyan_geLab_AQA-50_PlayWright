Feature: Mailfence e2e test

  Scenario: Send and process email
    Given Login to mailfence
    When Navigate to the Messages page
    And Compose new email with file attachment name "AT_C2256"
    And Send email to yourself
    And Navigate to Email list
    And Open the received email
    And Move attached file to My Documents
    And Navigate to the My Documents page
    And Move txt file to Trash by drag and drop
    Then Verify that txt file is in the Trash





