
convicted_adults <- read_csv(file_in("data/adults-convicted-in-court.csv"),
  col_types = cols(
  Court = col_character(),
  `Main offence` = col_character(),
  `Age group` = col_character(),
  Gender = col_character(),
  Ethnicity = col_character(),
  `Calendar year` = col_double(),
  Sentence = col_character(),
  Value = col_double(),
  Flags = col_logical())
) %>% janitor::clean_names()
