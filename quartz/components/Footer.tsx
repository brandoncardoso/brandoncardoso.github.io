import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"
import DarkmodeConstructor from "./Darkmode"
const Darkmode = DarkmodeConstructor()

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = (props: QuartzComponentProps) => {
    const { displayClass } = props
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <footer class={`${displayClass ?? ""}`}>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
        <div class="footer-bottom">
          <p>© {year} Brandon Cardoso</p>
          <Darkmode {...props} />
        </div>
      </footer>
    )
  }

  Footer.css = [style, Darkmode.css].flat().join("\n")
  Footer.beforeDOMLoaded = Darkmode.beforeDOMLoaded
  return Footer
}) satisfies QuartzComponentConstructor
