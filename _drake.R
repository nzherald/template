
suppressPackageStartupMessages(source("code/packages.R"))


casefile <- "https://github.com/Science-Media-Centre-NZ/tidy-covid-nz/raw/master/data/moh/caselists/tidy/caselist_2020-05-06.csv"


workflow_build <- function(knitr_file, deps = c()) {
  workflowr::wflow_build(knitr_file)
}



plan <- drake_plan(
  wflow_files = map_df(c(
    file_in("analysis/_site.yml"),
    file_in("analysis/nzh-style.css"),
    file_in("analysis/header.html"),
    file_in("analysis/doc_prefix.html"),
    file_in("analysis/doc_suffix.html")
  ), function(v) {
    fs::file_info(v) %>%
      select(access_time, change_time, birth_time) %>%
      mutate(path = v)
  }),
  cases = read_csv(casefile, col_types = cols(
    `date of report` = col_date(format = ""),
    sex = col_character(),
    `age group` = col_character(),
    dhb = col_character(),
    `international travel` = col_character(),
    `last country before return` = col_character(),
    `flight number` = col_character(),
    `flight departure date` = col_date(format = ""),
    `arrival date` = col_date(format = ""),
    casetype = col_character(),
    datasource = col_character(),
    releasedate = col_date(format = "")
  )),
  analysis_index = workflow_build(
    knitr_in("analysis/index.Rmd"),
    deps = wflow_files
  ),
  analysis_about = workflow_build(
    knitr_in("analysis/about.Rmd"),
    deps = wflow_files
  ),
)

drake_config(plan)
