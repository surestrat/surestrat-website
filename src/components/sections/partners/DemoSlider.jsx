import MiwayLogo from "@assets/images/miway-ins-logo.png";
import PineappleLogo from "@assets/images/pineapple-ins-logo.png";
import AbsaLogo from "@assets/images/absa-ins-logo.png";
import AutoGenLogo from "@assets/images/autogeneral-ins-logo.jpg";
import BudgetLogo from "@assets/images/budget-ins-logo.png";
import FfwLogo from "@assets/images/1st-for-women-ins-logo.png";
import KingPLogo from "@assets/images/KingPrice-ins-logo.png";

const DemoSlider = () => {
	return (
		<>
			<div class="logos">
				<div class="logos-slide">
					<img src={MiwayLogo} />
					<img src={PineappleLogo} />
					<img src={AbsaLogo} />
					<img src={AutoGenLogo} />
					<img src={BudgetLogo} />
					<img src={KingPLogo} />
					<img src={FfwLogo} />
				</div>

				<div class="logos-slide">
					<img src={MiwayLogo} />
					<img src={PineappleLogo} />
					<img src={AbsaLogo} />
					<img src={AutoGenLogo} />
					<img src={BudgetLogo} />
					<img src={KingPLogo} />
					<img src={FfwLogo} />
				</div>
			</div>
		</>
	);
};

export default DemoSlider;
