; Tree-sitter highlight queries for Qubitia

((identifier) @variable)
((function_definition name: (identifier) @function))
((call_expression function: (identifier) @function))

[ "let" "fn" "return" "if" "else" "qubit" "measure" ] @keyword

(string) @string
(number) @number
(comment) @comment
