// Tree-sitter grammar for Qubitia

module.exports = grammar({
  name: 'qubitia',
  extras: $ => [/\s/, $.comment],
  rules: {
    source_file: $ => repeat($._item),
    _item: $ => choice($.statement, $.function_definition),
    statement: $ => choice($.variable_declaration, $.qubit_declaration, $.measure_statement, $.return_statement, $.expression_statement),
    variable_declaration: $ => seq('let', $.identifier, optional(seq('=', $.expression)), optional(';')),
    qubit_declaration: $ => seq('qubit', $.identifier, optional(';')),
    measure_statement: $ => seq('measure', $.identifier, optional(';')),
    return_statement: $ => seq('return', optional($.expression), optional(';')),
    expression_statement: $ => seq($.expression, optional(';')),
    function_definition: $ => seq('fn', $.identifier, '(', optional($.identifier), ')', $.block),
    block: $ => seq('{', repeat($._item), '}'),
    expression: $ => choice($.string, $.number, $.identifier, $.call_expression),
    call_expression: $ => seq($.identifier, '(', optional($.identifier), ')'),
    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,
    number: $ => /[0-9]+/,
    string: $ => seq('"', repeat(/[^"]/), '"'),
    comment: $ => token(seq('//', /.*/)),
  }
});
