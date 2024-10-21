import "./DealNav.css";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function DealNav() {
  const [modal, setmodal] = useState(false);
  const toggleModel = () => {
    setmodal(!modal);
  };
  if (modal) {
    document.body.classList.add("active-modl");
  } else {
    document.body.classList.remove("active-modl");
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 Deal-nav-main">
            <div className="DealNaving-img">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAAAoCAYAAAAR33OgAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAjxSURBVHgB7Zt9UBTnHcd/98YdCgRhjG8pxDam6WhGpuk0bWPa2JagURtJ/minTSqTVpuAmdhK0xfHCY11HGsSsQ0xTdrpJTOOjTYzNbVOG1HRpNH4NoAChhdBFHk7uAPO4173+v3tASPn7t4dHNx57GfmN8/u87a7z373eV8NBVFa+sqSJUse+mpqalqqVq8lWQTYTcFut5v6+/u9eq3eQ+R3++CnEfxGg9FgmDVrls7nE2Y3NTbmLX0k9/OkkjDohw/KyspmP5r3nd2ZmRmr9XodTQTZ2VkdpJJQiAIqKCgwrVq17MP0Gen30wTS0dF1g1QSCrERKlz/s00TLR6m5mKNl1QSClFA6Wnp36MJ5tKlelhTA6kkFGITlmQ0zKIJwuVyU319E1VW1ZBpmunfpJJQiALy+byigPx+oqbGZurptbIfzv0wgbQ6PX3lgRxKSjJIZlJb20AOh5N0Og1MTzqtRkzr9njJau0TR2gaDf1r65Ytb5JKQjEyChN8Ap05W0nXrrWT1+slj8cjWuDYTQsX3icroPaOLhroHyC9Xk8GgwEi0okuj+aSDDrngN35VldH+69IJeEYEpCGLjdfEZsbiOagXxDOebxu8qIG4dpDEATEoI2ImCKVSUtzg/lqW8fxJF1g+K/VaiE2E9dG/U1N9UfNZrONVBISUUDV1bUuj8dn7LVZ1zy7du27UhF/9NSTa0hGQOhDHX9txw4zqUw5RAE1NDTbtRphQ3Fx8bukohIBooCud7S9UHnu3PukohIhooBKX311D6mojAE9TQLv/WPvs/ctuHfz4sUPzJMKx5D/ETh3yyR3ajSav5MCIdIzbbCjyMcnkXYOnO/CpBYAbUjzT1K+9mo46TQ++L5aYadwPRdFEdxfEpwfKkQZxDXfk0l7B5x8pbQTLqB9+/bkPLzkoZd6eqxK0Qpga2TCeASnKKAQ6Rl+QfyiD0qEsYDehhklwlpgigICO0lZvJHQhZf2e7hleKkCRQHk40ae38DhWrk4CE9DvLclgvhe1pM8ReMWEE8U2noHhCNHPizgc62B535MNDMzg3QG7RdNRtPz00FvjzWWK/Fcu+xEQX2Cguql+OVO2C7YfNgvKHq8QIFadr5M+HaUTTnKpnnYA+cr4BTJZ0nvI/4btwgoPz8/c2nu0kV+jz85JSXFgklBv9GoES5Uf2ZISZ1ORmMSLVr0JTFua+s1qqj4mJYvz91+z4IvzFa4GPkp5twD+y0K5pd48Di4HVkw5UbrcJ/v4D6rKAogn8GhpvYMLEkiygzYLsR5nMsGpOL8taF7kaIJ9hM+GCWguroLr6SmpRSlpaWZkJG4HBHM+fPVoltbV09VVRdp5co8ysiYoSgeBnOLPoo9z8N4Pe4YxTfTYd+HRUVADN5nNX88FKjhpFhFgZqqFFYCu1cmHu+oeA759fHJiICOnziyY95dczcOn0uJh0lONmHisY56rTbKX72CTCYjhYPVauum2MNfH39pDw8XwATjgfF1eNeDZsjl5pTL3RQi7RyKMnjmP+LZ83D4mEyULQhngWxQyOZN5HN4+GRkU+qcOXN/QCHg9TK7fVAU0be++WDY4mFqaz6jOIH3PW2kyeECCnsmLBOWAUuHcfPANQw3KR6afH5MgSZICl5p+BON2qw8itOwn9/sMRJRq9XcRQo4nS6qrKql7Kx5tGDBfKhZS+Hgg+hOnjxLly+jwxQ/FONLe5BixNAIqxzWSJMMrt0DZx0FmqJI4NHw00g/Kt1IE6bTBQTBC6p16N84bjjEji8b172OQRflLF5IM2dm3JKzxWIll9Mpbgfx+nwQjQ+r+D5yDjqp7Xo79fX1I5Yv1HB4ogja/i+SDCuFiHIpdnDRxqRfCBEcxbNvweHvIkj2ItLVB3uO6kQ7HA766OPTZMPQfHhLh18IyCj30W9LiofhLSBWWx/pdXrS67UQnBYpBKT3iVs8sLK/fdu2bX+l2LAPtpJuXQj+GgWGqYdparIVxvNDeWHEfUdmnmi0gBoaWlgwTpjZ7XF1OuwOSp6e0u52ulx+v48nzCRnXPv6bOVXr7Q2GY2mQZPJ5DAYDF6dQQcNCfb6+vr/bNq06SLFjpMwnt/4jUTYZtiU/FOEZ+VRC9nDjC4b76ZR2Cn/NFNyp8XSnVdYWFgdHPGxFZUvkYyAUqZP27N+fZGZ4hf+2pbDcoL8uTP7MkkvYyQ0EA8P2Z8MM3oR4h+D6G5ZcB/pG3R1drlray89LSWeUHBTFc/gwfl3Ii4wh0RwFk3SmmC8ADHwSHRrZKnEPuOdwZ4jAjpz+tMvl5RsLqcxcMMZ/797QUQn4Oym+GHGkE0qQ4urf6ZA7RsJPEo3B3uOfHn79++vpTHiccZiOmNMlMCWwRbS5DAPL2ynhD83mUs5nCIE+XE3YqdClAMhdhC8Dvu6Qvh12FyZsOW4/jrk/9awR1SqbudtUAMxeHA7CoBnWQ/AptHEw3+7bKCx0S/jzwIqIHk6SWYHAZ6dlyueUUh7lgLbNz4leRFxU3Z4eOE1vNnAEPBw/3YBD87N9F8ovuFO5XGKInjp3FzyLLPcgMFJgTUunvAtVsiK59D2Ij9xoXXcAuL5ouarrRa6veDhe9ysrUhwHvZfii5/g2UrhL8M8XANxB/ZXpLo79wEz+K/yAfjFlBbWwfaQX1UNj9NFiggbh54v42T4o9PYE8NjRyjwtCQ/XGFKFwr/yHI79ewdoU0vPB6/7j6QLzL8ErLVaGiouI8jY8Kkt8yFM5LrlBILzk4wAs6hALgQsohecL5n437U3fQ+OB7541u/4MdxL15QtyTWSH87KiMA6Ou7BBptgVv98V5J9LybsRVCume0FCYXKypbM7K+tzdw+eNjS2Yub5M/f0Du9f+9JlCUpmSRFwDcYf5xEenxPWvwUHHKYd9IJpbL1VuMyISkMMxSAcOHKLu7h6efTZryPtcSUlJPPYjVCaJsAXk8wr0wQeHqL2902PptWx4fdeuN0hlyhO2gA6XH/Ohv2PvsXSvLisrO0IqKhTBML7b0mvts1mfUMWjMiYKCgqWkYpKEP8HFoxl6QTREToAAAAASUVORK5CYII=" />
            </div>
            <ul className="DealingNaving-ul">
              <Link to="/Panel Deal" className="dealnav-li">
                Home
              </Link>
              <Link className="dealnav-li" to="/Claim Reward">
                Claim
              </Link>
            </ul>
            <div className="navwallet-btn">
              <span onClick={toggleModel}>Connect Wallet</span>
              <span>
                <i className="fas fa-wallet" style={{ fontSize: "16px" }}></i>
              </span>
            </div>
            {modal && (
              <div className="dealmodel">
                <div onClick={toggleModel} className="dealnavoverlay"></div>
                <div className="dealmodelcontent">
                  <div className="container">
                    <div className="row">
                        <div  className="dealnav-center-model">
                            <p>Connect Wallet</p>
                            </div>
                      <div className="col-lg-12 dealnav-modelbox">
                        <img  className="dealmodelimg" src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjMzIiB2aWV3Qm94PSIwIDAgMzUgMzMiIHdpZHRoPSIzNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iLjI1Ij48cGF0aCBkPSJtMzIuOTU4MiAxLTEzLjEzNDEgOS43MTgzIDIuNDQyNC01LjcyNzMxeiIgZmlsbD0iI2UxNzcyNiIgc3Ryb2tlPSIjZTE3NzI2Ii8+PGcgZmlsbD0iI2UyNzYyNSIgc3Ryb2tlPSIjZTI3NjI1Ij48cGF0aCBkPSJtMi42NjI5NiAxIDEzLjAxNzE0IDkuODA5LTIuMzI1NC01LjgxODAyeiIvPjxwYXRoIGQ9Im0yOC4yMjk1IDIzLjUzMzUtMy40OTQ3IDUuMzM4NiA3LjQ4MjkgMi4wNjAzIDIuMTQzNi03LjI4MjN6Ii8+PHBhdGggZD0ibTEuMjcyODEgMjMuNjUwMSAyLjEzMDU1IDcuMjgyMyA3LjQ2OTk0LTIuMDYwMy0zLjQ4MTY2LTUuMzM4NnoiLz48cGF0aCBkPSJtMTAuNDcwNiAxNC41MTQ5LTIuMDc4NiAzLjEzNTggNy40MDUuMzM2OS0uMjQ2OS03Ljk2OXoiLz48cGF0aCBkPSJtMjUuMTUwNSAxNC41MTQ5LTUuMTU3NS00LjU4NzA0LS4xNjg4IDguMDU5NzQgNy40MDQ5LS4zMzY5eiIvPjxwYXRoIGQ9Im0xMC44NzMzIDI4Ljg3MjEgNC40ODE5LTIuMTYzOS0zLjg1ODMtMy4wMDYyeiIvPjxwYXRoIGQ9Im0yMC4yNjU5IDI2LjcwODIgNC40Njg5IDIuMTYzOS0uNjEwNS01LjE3MDF6Ii8+PC9nPjxwYXRoIGQ9Im0yNC43MzQ4IDI4Ljg3MjEtNC40NjktMi4xNjM5LjM2MzggMi45MDI1LS4wMzkgMS4yMzF6IiBmaWxsPSIjZDViZmIyIiBzdHJva2U9IiNkNWJmYjIiLz48cGF0aCBkPSJtMTAuODczMiAyOC44NzIxIDQuMTU3MiAxLjk2OTYtLjAyNi0xLjIzMS4zNTA4LTIuOTAyNXoiIGZpbGw9IiNkNWJmYjIiIHN0cm9rZT0iI2Q1YmZiMiIvPjxwYXRoIGQ9Im0xNS4xMDg0IDIxLjc4NDItMy43MTU1LTEuMDg4NCAyLjYyNDMtMS4yMDUxeiIgZmlsbD0iIzIzMzQ0NyIgc3Ryb2tlPSIjMjMzNDQ3Ii8+PHBhdGggZD0ibTIwLjUxMjYgMjEuNzg0MiAxLjA5MTMtMi4yOTM1IDIuNjM3MiAxLjIwNTF6IiBmaWxsPSIjMjMzNDQ3IiBzdHJva2U9IiMyMzM0NDciLz48cGF0aCBkPSJtMTAuODczMyAyOC44NzIxLjY0OTUtNS4zMzg2LTQuMTMxMTcuMTE2N3oiIGZpbGw9IiNjYzYyMjgiIHN0cm9rZT0iI2NjNjIyOCIvPjxwYXRoIGQ9Im0yNC4wOTgyIDIzLjUzMzUuNjM2NiA1LjMzODYgMy40OTQ2LTUuMjIxOXoiIGZpbGw9IiNjYzYyMjgiIHN0cm9rZT0iI2NjNjIyOCIvPjxwYXRoIGQ9Im0yNy4yMjkxIDE3LjY1MDctNy40MDUuMzM2OS42ODg1IDMuNzk2NiAxLjA5MTMtMi4yOTM1IDIuNjM3MiAxLjIwNTF6IiBmaWxsPSIjY2M2MjI4IiBzdHJva2U9IiNjYzYyMjgiLz48cGF0aCBkPSJtMTEuMzkyOSAyMC42OTU4IDIuNjI0Mi0xLjIwNTEgMS4wOTEzIDIuMjkzNS42ODg1LTMuNzk2Ni03LjQwNDk1LS4zMzY5eiIgZmlsbD0iI2NjNjIyOCIgc3Ryb2tlPSIjY2M2MjI4Ii8+PHBhdGggZD0ibTguMzkyIDE3LjY1MDcgMy4xMDQ5IDYuMDUxMy0uMTAzOS0zLjAwNjJ6IiBmaWxsPSIjZTI3NTI1IiBzdHJva2U9IiNlMjc1MjUiLz48cGF0aCBkPSJtMjQuMjQxMiAyMC42OTU4LS4xMTY5IDMuMDA2MiAzLjEwNDktNi4wNTEzeiIgZmlsbD0iI2UyNzUyNSIgc3Ryb2tlPSIjZTI3NTI1Ii8+PHBhdGggZD0ibTE1Ljc5NyAxNy45ODc2LS42ODg2IDMuNzk2Ny44NzA0IDQuNDgzMy4xOTQ5LTUuOTA4N3oiIGZpbGw9IiNlMjc1MjUiIHN0cm9rZT0iI2UyNzUyNSIvPjxwYXRoIGQ9Im0xOS44MjQyIDE3Ljk4NzYtLjM2MzggMi4zNTg0LjE4MTkgNS45MjE2Ljg3MDQtNC40ODMzeiIgZmlsbD0iI2UyNzUyNSIgc3Ryb2tlPSIjZTI3NTI1Ii8+PHBhdGggZD0ibTIwLjUxMjcgMjEuNzg0Mi0uODcwNCA0LjQ4MzQuNjIzNi40NDA2IDMuODU4NC0zLjAwNjIuMTE2OS0zLjAwNjJ6IiBmaWxsPSIjZjU4NDFmIiBzdHJva2U9IiNmNTg0MWYiLz48cGF0aCBkPSJtMTEuMzkyOSAyMC42OTU4LjEwNCAzLjAwNjIgMy44NTgzIDMuMDA2Mi42MjM2LS40NDA2LS44NzA0LTQuNDgzNHoiIGZpbGw9IiNmNTg0MWYiIHN0cm9rZT0iI2Y1ODQxZiIvPjxwYXRoIGQ9Im0yMC41OTA2IDMwLjg0MTcuMDM5LTEuMjMxLS4zMzc4LS4yODUxaC00Ljk2MjZsLS4zMjQ4LjI4NTEuMDI2IDEuMjMxLTQuMTU3Mi0xLjk2OTYgMS40NTUxIDEuMTkyMSAyLjk0ODkgMi4wMzQ0aDUuMDUzNmwyLjk2Mi0yLjAzNDQgMS40NDItMS4xOTIxeiIgZmlsbD0iI2MwYWM5ZCIgc3Ryb2tlPSIjYzBhYzlkIi8+PHBhdGggZD0ibTIwLjI2NTkgMjYuNzA4Mi0uNjIzNi0uNDQwNmgtMy42NjM1bC0uNjIzNi40NDA2LS4zNTA4IDIuOTAyNS4zMjQ4LS4yODUxaDQuOTYyNmwuMzM3OC4yODUxeiIgZmlsbD0iIzE2MTYxNiIgc3Ryb2tlPSIjMTYxNjE2Ii8+PHBhdGggZD0ibTMzLjUxNjggMTEuMzUzMiAxLjEwNDMtNS4zNjQ0Ny0xLjY2MjktNC45ODg3My0xMi42OTIzIDkuMzk0NCA0Ljg4NDYgNC4xMjA1IDYuODk4MyAyLjAwODUgMS41Mi0xLjc3NTItLjY2MjYtLjQ3OTUgMS4wNTIzLS45NTg4LS44MDU0LS42MjIgMS4wNTIzLS44MDM0eiIgZmlsbD0iIzc2M2UxYSIgc3Ryb2tlPSIjNzYzZTFhIi8+PHBhdGggZD0ibTEgNS45ODg3MyAxLjExNzI0IDUuMzY0NDctLjcxNDUxLjUzMTMgMS4wNjUyNy44MDM0LS44MDU0NS42MjIgMS4wNTIyOC45NTg4LS42NjI1NS40Nzk1IDEuNTE5OTcgMS43NzUyIDYuODk4MzUtMi4wMDg1IDQuODg0Ni00LjEyMDUtMTIuNjkyMzMtOS4zOTQ0eiIgZmlsbD0iIzc2M2UxYSIgc3Ryb2tlPSIjNzYzZTFhIi8+PHBhdGggZD0ibTMyLjA0ODkgMTYuNTIzNC02Ljg5ODMtMi4wMDg1IDIuMDc4NiAzLjEzNTgtMy4xMDQ5IDYuMDUxMyA0LjEwNTItLjA1MTloNi4xMzE4eiIgZmlsbD0iI2Y1ODQxZiIgc3Ryb2tlPSIjZjU4NDFmIi8+PHBhdGggZD0ibTEwLjQ3MDUgMTQuNTE0OS02Ljg5ODI4IDIuMDA4NS0yLjI5OTQ0IDcuMTI2N2g2LjExODgzbDQuMTA1MTkuMDUxOS0zLjEwNDg3LTYuMDUxM3oiIGZpbGw9IiNmNTg0MWYiIHN0cm9rZT0iI2Y1ODQxZiIvPjxwYXRoIGQ9Im0xOS44MjQxIDE3Ljk4NzYuNDQxNy03LjU5MzIgMi4wMDA3LTUuNDAzNGgtOC45MTE5bDIuMDAwNiA1LjQwMzQuNDQxNyA3LjU5MzIuMTY4OSAyLjM4NDIuMDEzIDUuODk1OGgzLjY2MzVsLjAxMy01Ljg5NTh6IiBmaWxsPSIjZjU4NDFmIiBzdHJva2U9IiNmNTg0MWYiLz48L2c+PC9zdmc+"/>
                        <p >MetaMask</p>
                      </div>
                      <div className="col-lg-12 deal-top-model dealnav-modelbox">
                        <img  className="dealmodelimg" src="https://avatars.githubusercontent.com/u/32179889?v=4"/>
                        <p >Trust Wallet</p>
                      </div>
                      <div className="col-lg-12 deal-top-model dealnav-modelbox">
                        <img  className="dealmodelimg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMh00Q-oc0sJ8n5TvkG1RaT7CdYjb9ISuuow&s"/>
                        <p >CoinBase</p>
                      </div>
                      
                    </div>
                  </div>
                  <button onClick={toggleModel} className="navdealclose">
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
