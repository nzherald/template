

theme_nzh <- function(base_size = 16, base_family = "Stag Sans Light") {
  (theme_foundation(base_size = base_size, base_family = base_family) +
    theme(
      axis.line.x = element_line(
        colour = "black",
        size = 0.5,
        linetype = "solid"
      ),
      axis.line.y = element_line(
        colour = "black",
        size = 0.5,
        linetype = "solid"
      ),
      axis.text = element_text(
        size = ceiling(base_size * 0.7),
        colour = "black"
      ),
      axis.text.y = element_text(size = 10),
      axis.title = element_text(size = ceiling(base_size * 0.8)),
      axis.title.x = element_text(vjust = 0, hjust = 1),
      axis.title.y = element_text(hjust = 1, vjust = 0.5),
      panel.grid.minor = element_blank(),
      panel.grid.major.y = element_line(
        colour = "gray",
        linetype = "dotted"
      ),
      panel.grid.major.x = element_blank(),
      panel.background = element_blank(),
      panel.border = element_blank(),
      strip.background = element_blank(),
      strip.text = element_text(
        size = ceiling(base_size * 0.95),
        family = "Stag Sans Book"
      ),
      strip.text.x = element_text(vjust = 0.5),
      strip.text.y = element_text(angle = -90),
      legend.text = element_text(
        size = ceiling(base_size * 0.9),
        family = "Stag Sans Book"
      ),
      legend.title = element_text(
        size = base_size,
        family = "Stag Sans Book"
      ),
      legend.position = "top",
      legend.background = element_blank(),
      legend.direction = "horizontal",
      legend.key = element_rect(fill = "white", colour = NA),
      plot.background = element_blank(),
      plot.title = element_text(
        size = ceiling(base_size * 1.15),
        family = "Stag Sans Medium"
      ),
      plot.title.position = "plot",
      plot.subtitle = element_text(
        size = ceiling(base_size * 1.05),
        family = "Stag Sans Book"
      ),
      plot.caption.position = "plot",
      plot.caption = element_text(
        hjust = 0,
        color = "#545454",
        size = ceiling(base_size * 0.9)
      )
    )
  )
}


grid_export <- function(path, width, height, prefix, p,
  garnish = function() {}) {
  gridsvg(path,
    res = 100, width = width, height = height,
    annotate = F,
    strict = F,
    addClasses = F,
    indent = F,
    usePaths = "none",
    prefix = prefix,
    xmldecl = NULL,
  )

  suppressWarnings(grid.draw(p))
  suppressWarnings(grid.force())
  garnish()
  suppressWarnings(dev.off())
}
