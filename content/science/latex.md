---
title: LaTeX
tags: []
modified: 2026-04-07T15:15:28Z
---

*LAH-tehk*

## Usage in Markdown

Surround notation with single `$` for inline display. Place `$$` in line before and after notation for block display.

* Inline: `$a+b$` becomes $a+b$
* Block:
  ```latex
  $$
  a+b
  $$
  ```
  $$
  a+b
  $$


## Syntax/Terminology

* **control sequences** -- prefixed with `\`
  * also called "commands" or "macros"
  * two kinds:
    * **Control words** -- backslash `\` + some word: `\begin`, `\frac`, `\times`
    * **Control symbols** -- backslash `\` + some symbol: `\\`, `\,`, `\!`


## Formatting

### Grouping

* curly braces `{}` group content as a single unit
* required when a subscript or superscript is more than one character
* without braces, `$x^10$` renders as $x^10$ where only the `1` is superscript


### Spacing

| Command  | Size                | Example           | Output          |
|----------|---------------------|-------------------|-----------------|
| `\,`     | Thin space          | `$\int f(x)\,dx$` | $\int f(x)\,dx$ |
| `\quad`  | Medium space        | `$a \quad b$`     | $a \quad b$     |
| `\qquad` | Large space         | `$a \qquad b$`    | $a \qquad b$    |
| `\!`     | Negative thin space | `$a\!b$`          | $a\!b$          |

### Text & Style

| Command         | Purpose                  | Example                       | Output                      |
|-----------------|--------------------------|-------------------------------|-----------------------------|
| `\text{}`       | Normal text              | `$x \text{ if } x > 0$`       | $x \text{ if } x > 0$       |
| `\mathbf{}`     | Bold face                | `$\mathbf{v}$`                | $\mathbf{v}$                |
| `\mathrm{}`     | Upright ("roman")        | `$\mathrm{pH}$`               | $\mathrm{pH}$               |
| `\mathbb{}`     | Blackboard bold          | `$\mathbb{R}$`                | $\mathbb{R}$                |
| `\displaystyle` | Full-size in inline mode | `$\displaystyle\sum_{k=1}^n$` | $\displaystyle\sum_{k=1}^n$ |

### Auto-Sizing Delimiters

* `\left` and `\right` scale delimiters to fit content
* they must always be paired
  * use `.` as an invisible match if necessary

| Example                              | Output                             |
|--------------------------------------|------------------------------------|
| `$\left(\frac{a}{b}\right)$`        | $\left(\frac{a}{b}\right)$        |
| `$\left.\frac{df}{dx}\right\rvert_{a}$` | $\left.\frac{df}{dx}\right\rvert_{a}$ |

### Other

* usually used to highlight final answer or key result
* `$\boxed{x=5}$` -> $\boxed{x=5}$


## Alignment

### aligned
* use `\begin{aligned} ... \end{aligned}` to align multiple lines
* `&` marks the alignment point(s)
* `\\` marks end of each line
  * except the last line, adds extra blank space
* ex. place `&` before the `=` character to align all equations
  ```latex
  $$
  \begin{aligned}
  2x + 3y &= 7 \\
  x - y &= 1
  \end{aligned}
  $$
  ```


  $$
  \begin{aligned}
  2x + 3y &= 7 \\
  x - y &= 1
  \end{aligned}
  $$


### gathered

* use `gathered` when lines should be centered, not aligned at a specific point
  ```latex
  $$
  \begin{gathered}
    f(x) = x^2 + 2x + 1 \\
    x \in \mathbb{R}
  \end{gathered}
  $$
  ```

  $$
  \begin{gathered}
    f(x) = x^2 + 2x + 1 \\
    x \in \mathbb{R}
  \end{gathered}
  $$


## Notation

### Arithmetic

| Notation           | Example         | Output        |
|----------------|-----------------|---------------|
| Multiplication | `$a \times b$`  | $a \times b$  |
|                | `$a \ast b$`    | $a \ast b$    |
|                | `$a \cdot b$`   | $a \cdot b$   |
| Division       | `$a / b$`       | $a / b$       |
|                | `$a \div b$`    | $a \div b$    |
|                | `$\frac{a}{b}$` | $\frac{a}{b}$ |
| Plus or Minus  | `$\pm a$`       | $\pm a$       |
| Roots          | `$\sqrt{a}$`    | $\sqrt{a}$    |
|                | `$\sqrt[n]{a}$` | $\sqrt[n]{a}$ |


### Equality

| Notation         | Example          | Output        |
|--------------|------------------|---------------|
| Not Equal    | `$a \neq b$`     | $a \neq b$    |
| Equivalent   | `$a \equiv b$`   | $a \equiv b$  |
| Proportional | `$a \propto b $` | $a \propto b$ |
| Approx.      | `$a \approx b$`  | $a \approx b$ |


### Comparison

| Notation                  | Example      | Output     |
|-----------------------|--------------|------------|
| Less Than or Equal    | `$a \leq b$` | $a \leq b$ |
| Greater than or Equal | `$a \geq b$` | $a \geq b$ |
| Much Smaller Than     | `$a \ll b$`  | $a \ll b$  |
| Much Larger Than      | `$a \gg b$`  | $a \gg b$  |

### Algebra

| Notation           | Example                        | Output                       |
|----------------|--------------------------------|------------------------------|
| Absolute Value | `$\lvert a \rvert$`            | $\lvert a \rvert$            |
| Function Of    | `$f(x)=x^2$`                   | $f(x)=x^2$                   |
| Delta          | `$\Delta x$`                   | $\Delta x$                   |
| Pi             | `$\pi$`                        | $\pi$                        |
| Sum            | `$\sum_{k=3}^5$`               | $\sum_{k=3}^5$               |
|                | `$\displaystyle\sum_{k=3}^5$`  | $\displaystyle\sum_{k=3}^5$  |
| Product        | `$\prod_{x=2}^4$`              | $\prod_{x=2}^4$              |
|                | `$\displaystyle\prod_{x=2}^4$` | $\displaystyle\prod_{x=2}^4$ |

### Angles

| Notation     | Example                    | Output                   |
|----------|----------------------------|--------------------------|
| Angle    | `$\angle$`                 | $\angle$                 |
| Degree   | `$30\degree45\rq40\rq\rq$` | $30\degree45\rq40\rq\rq$ |
| Radians  | `$2\pi rad$`               | $2\pi rad$               |

### Probability & Statistics

| Notation            | Example               | Output              |
|-----------------|-----------------------|---------------------|
| Probability     | `$P(A)$`, `$\Pr(A)$`  | $P(A)$, $\Pr(A)$    |
| Intersection    | `$P(A \cap B)$`       | $P(A \cap B)$       |
| Union           | `$P(A \cup B)$`       | $P(A \cup B)$       |
| Conditional     | `$P(A \mid B)$`       | $P(A \mid B)$       |
| Median          | `$\tilde{x}$`         | $\tilde{x}$         |
| Population Mean | `$\overline{x}$`      | $\overline{x}$      |
|                 | `$\langle x \rangle$` | $\langle x \rangle$ |

### Linear Algebra

#### Vectors

| Notation          | Example                                              | Output                                             |
|---------------|------------------------------------------------------|----------------------------------------------------|
| Vector        | `$\mathbf{v}$`                                       | $\mathbf{v}$                                       |
|               | `$\vec{v}$`                                          | $\vec{v}$                                          |
| Column Vector | `$\mathbf{v}=\begin{pmatrix}4\cr5\cr6\end{pmatrix}$` | $\mathbf{v}=\begin{pmatrix}4\cr5\cr6\end{pmatrix}$ |
| Row Vector    | `$\mathbf{v}^T = \begin{pmatrix}1&2&3\end{pmatrix}$` | $\mathbf{v}^T=\begin{pmatrix}1&2&3\end{pmatrix}$   |
| Norm          | `$\lVert \mathbf{v} \rVert$`                         | $\lVert \mathbf{v} \rVert$                         |


#### Matrices

| Notation              | Example                                         | Output                                        |
|-------------------|-------------------------------------------------|-----------------------------------------------|
| Matrix            | `$A=\begin{bmatrix}1&2&3\cr4&5&6\end{bmatrix}$` | $A=\begin{bmatrix}1&2&3\cr4&5&6\end{bmatrix}$ |
| Hadamard Product  | `$A \circ B$`                                   | $A \circ B$                                   |
| Kronecker Product | `$A \otimes B$`                                 | $A \otimes B$                                 |


### Calculus

| Notation                  | Example                                                                                 | Output                                                                                |
|-----------------------|-----------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| Limit                 | `$\lim_{x \to \infty} f(x)$`                                                            | $\lim_{x \to \infty} f(x)$                                                            |
| Derivative Definition | `$\lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$`                                              | $\lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$                                              |
| Partial Derivative    | `$\frac{\partial f}{\partial x}$`                                                       | $\frac{\partial f}{\partial x}$                                                       |
| Evaluated At          | `$\left. \frac{df}{dx} \right\rvert_{x=a}$`                                             | $\left. \frac{df}{dx} \right\rvert_{x=a}$                                             |
| Evaluated Between     | `$\left. F(x) \right\rvert_a^b$`                                                        | $\left. F(x) \right\rvert_a^b$                                                        |
| Integration           | `$\int f(x) \, dx$`                                                                     | $\int f(x) \, dx$                                                                     |
| Definite Integral     | `$\int_a^b f(x) \, dx$`                                                                 | $\int_a^b f(x) \, dx$                                                                 |
| Double Integral       | `$\iint f \, dA$`                                                                       | $\iint f \, dA$                                                                       |
| Triple Integral       | `$\iiint f \, dV$`                                                                      | $\iiint f \, dV$                                                                      |
| Closed Line Integral  | `$\oint \mathbf{F} \cdot d\mathbf{r}$`                                                  | $\oint \mathbf{F} \cdot d\mathbf{r}$                                                  |
| Gradient              | `$\nabla f$`                                                                            | $\nabla f$                                                                            |
| Infinity              | `$\infty$`                                                                              | $\infty$                                                                              |
| Piecewise Function    | `$f(x) = \begin{cases} x^2 & \text{if } x \geq 0 \\ -x & \text{if } x < 0 \end{cases}$` | $f(x) = \begin{cases} x^2 & \text{if } x \geq 0 \\ -x & \text{if } x < 0 \end{cases}$ |
| Dot Notation (Time)   | `$\dot{f}$` `$\ddot{f}$`                                                                | $\dot{f}$  $\ddot{f}$                                                                 |
| Primes                | `$f'$` `$f''$`                                                                          | $f'$  $f''$                                                                           |


### Chemistry

Requires the [mhchem LaTex extension](https://mhchem.github.io/MathJax-mhchem/). Standard LaTeX treats letters as italic variables and requires verbose workarounds like adding `\text{}` around every element symbol.

| Notation                 | Example                                      | Output                                     |
|----------------------|----------------------------------------------|--------------------------------------------|
| Chemical Formula     | `$\ce{H2SO4}$`                               | $\ce{H2SO4}$                               |
| Isotope              | `$\ce{^{14}_{6}C}$`                          | $\ce{^{14}_{6}C}$                          |
| Ions                 | `$\ce{Ca^2+}$`                               | $\ce{Ca^2+}$                               |
|                      | `$\ce{Cl-}$`                                 | $\ce{Cl-}$                                 |
| Reaction             | `$\ce{2H2 + O2 -> 2H2O}$`                    | $\ce{2H2 + O2 -> 2H2O}$                    |
| Reaction Conditions  | `$\ce{N2 + 3H2 ->[\Delta] 2NH3}$`            | $\ce{N2 + 3H2 ->[\Delta] 2NH3}$            |
| Reversible Reaction  | `$\ce{A <=> B}$`                             | $\ce{A <=> B}$                             |
| Equilibrium Constant | `$K_{eq} = \frac{\ce{[C][D]}}{\ce{[A][B]}}$` | $K_{eq} = \frac{\ce{[C][D]}}{\ce{[A][B]}}$ |
| Precipitation        | `$\ce{Ag+ + Cl- -> AgCl v}$`                 | $\ce{Ag+ + Cl- -> AgCl v}$                 |
| Physical Units       | `$\pu{8.314 J mol-1 K-1}$`                   | $\pu{8.314 J mol-1 K-1}$                   |
| Bonds                | `$\ce{A\bond{~}B\bond{~-}C}$`                | $\ce{A\bond{~}B\bond{~-}C}$                |
| Radical Dot          | `$\ce{OCO^{.-}}$`                            | $\ce{OCO^{.-}}$                            |
| Arrow with Text      | `$\ce{A ->[{text above}][{text below}] B}$`  | $\ce{A ->[{text above}][{text below}] B}$  |
| Escaped Braces       | `$\ce{[\{(X2)3\}2]^3+}$`                     | $\ce{[\{(X2)3\}2]^3+}$                     |

