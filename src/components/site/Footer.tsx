import { loungeLogo } from "@/lib/site-images";

export function Footer() {
  return (
    <footer className="relative border-t border-border px-5 py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <img src={loungeLogo} alt="Hookahs Lounge" className="h-20 w-20 object-contain" />
          <p className="mt-4 text-sm text-muted-foreground">
            120 Lower Ford Street
            <br />
            Coventry CV1 5PW
          </p>
          <a href="tel:07922466215" className="mt-3 inline-block text-sm text-gold">
            07922 466215
          </a>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="font-display text-xs tracking-[0.22em] uppercase text-gold">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#menu" className="hover:text-gold">
                  Menu
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-gold">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#visit" className="hover:text-gold">
                  Visit
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gold">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xs tracking-[0.22em] uppercase text-gold">Hours</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Monday to Sunday
              <br />
              12:00 midday – 2:00 am
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-border pt-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Hookahs Lounge Coventry. Over 18s only.
      </div>
    </footer>
  );
}
