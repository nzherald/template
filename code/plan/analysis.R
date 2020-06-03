
workflow_build <- function(knitr_file, deps = c()) {
  workflowr::wflow_build(knitr_file)
}


analysis_plan <- drake_plan(
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
  analysis_index = workflow_build(knitr_in("analysis/index.Rmd"), deps = wflow_files),
  analysis_about = workflow_build(knitr_in("analysis/about.Rmd"), deps = wflow_files)
)
