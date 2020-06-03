suppressPackageStartupMessages(source("code/packages.R"))

source("code/plan/analysis.R")

data_plan <- code_to_plan("code/plan/data.R")

plan <- bind_plans(
  data_plan,
  analysis_plan
)

drake_config(plan)
