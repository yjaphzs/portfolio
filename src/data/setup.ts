import {
  gearAula,
  gearEdifier,
  gearHoto,
  gearKoorui,
  gearMaono,
  gearMchose,
  gearMoondrop,
  gearRapoo,
  gearThinkpad,
} from "@/data/assets";

/** One row on the back of a gear card. */
export type SpecRow = { label: string; value: string };

export type GearItem = {
  id: string;
  /** Short uppercase label — rendered in the mono micro-label register. */
  category: string;
  brand: string;
  model: string;
  /**
   * The card front: the two or three details that actually matter. Kept to one
   * short line — the full sheet lives in `specs` on the back.
   */
  spec?: string;
  /** The card back. Omit and the card does not flip. */
  specs?: SpecRow[];
  /**
   * Product image. Leave undefined to render the halftone placeholder well, so
   * the layout is final before real photography lands. Add real images under
   * `src/assets/v3/images/gear/` and re-export them through the assets barrel
   * rather than importing them here directly.
   */
  image?: string;
  url?: string;
};

/**
 * Desk setup showcase. Ordered compute → input → audio → tools, which also
 * happens to fill the grid as coherent rows.
 *
 * `spec` is the preview; `specs` is the sheet. Manufacturer figures throughout,
 * except the laptop, whose configuration is the owner's own.
 */
export const setup: GearItem[] = [
  {
    id: "laptop",
    category: "Laptop",
    brand: "Lenovo",
    // Not the P16 Gen 2 — that line is 13th/14th-gen HX only. Core Ultra with an
    // RTX 1000 Ada is the P16v.
    model: "ThinkPad P16v Gen 2",
    spec: "Core Ultra 7 165H · 65GB DDR5-5600 · 2.5TB NVMe · RTX 1000 Ada",
    specs: [
      { label: "Processor", value: "Intel Core Ultra 7 165H" },
      { label: "Cores", value: "16 · up to 5.0GHz P-core" },
      { label: "Memory", value: "65GB DDR5-5600" },
      { label: "Storage", value: "2.5TB NVMe SSD" },
      { label: "Graphics", value: "NVIDIA RTX 1000 Ada" },
      { label: "Display", value: '16" mobile workstation' },
      { label: "Class", value: "ISV-certified workstation" },
    ],
    image: gearThinkpad,
  },
  {
    id: "display",
    category: "Display",
    brand: "KOORUI",
    model: "27E6QC",
    spec: '27" QHD VA · 144Hz · 1800R curve',
    specs: [
      { label: "Panel", value: '27" VA, 1800R curved' },
      { label: "Resolution", value: "2560 × 1440 (QHD)" },
      { label: "Refresh", value: "144Hz" },
      { label: "Response", value: "1ms MPRT" },
      { label: "Colour", value: "85% DCI-P3" },
      { label: "Viewing angle", value: "178°" },
      { label: "Inputs", value: "2 × HDMI, 1 × DP 1.2" },
      { label: "Sync", value: "Adaptive-Sync" },
      { label: "Eye care", value: "Flicker-free, low blue light" },
    ],
    image: gearKoorui,
  },
  {
    id: "keyboard-mchose",
    category: "Keyboard",
    brand: "MCHOSE",
    model: "X75 V2",
    spec: "75% gasket · tri-mode · hot-swap",
    specs: [
      { label: "Layout", value: "75% · 82 keys" },
      { label: "Mount", value: "5-layer gasket" },
      { label: "PCB", value: "1.2mm south-facing, 5-pin hot-swap" },
      { label: "Keycaps", value: "Double-shot PBT" },
      { label: "Connection", value: "BT 5.0 · 2.4GHz · USB-C" },
      { label: "Polling", value: "Up to 8K" },
      { label: "Rollover", value: "N-key" },
      { label: "Weight", value: "≈1.2kg" },
    ],
    image: gearMchose,
  },
  {
    id: "keyboard-aula",
    category: "Keyboard",
    brand: "AULA",
    model: "F75",
    spec: "75% gasket · media knob · 4000mAh",
    specs: [
      { label: "Layout", value: "75% · 81 keys" },
      { label: "Mount", value: "Leaf-spring gasket" },
      { label: "Damping", value: "Five-layer (PORON, IXPE, PET, silicone)" },
      { label: "PCB", value: "Hot-swap, 3-pin and 5-pin" },
      { label: "Keycaps", value: "Side-printed PBT" },
      { label: "Connection", value: "BT 5.0 · 2.4GHz · USB-C" },
      { label: "Polling", value: "1000Hz wired / 2.4GHz · 125Hz BT" },
      { label: "Battery", value: "4000mAh" },
      { label: "Controls", value: "Rotary media knob" },
    ],
    image: gearAula,
  },
  {
    id: "mouse",
    category: "Mouse",
    brand: "RAPOO",
    model: "MT760L",
    spec: "4000 DPI · multi-mode · 4 devices",
    specs: [
      { label: "Sensor", value: "Pixart 3220" },
      { label: "Resolution", value: "50–4000 DPI, 7 presets" },
      { label: "Connection", value: "BT · 2.4GHz · wired" },
      { label: "Multi-device", value: "Up to 4, with cross-screen transfer" },
      { label: "Buttons", value: "9, programmable" },
      { label: "Battery", value: "800mAh, USB-C" },
      { label: "Feet", value: "Teflon" },
      { label: "Shape", value: "Ergonomic, thumb rest" },
    ],
    image: gearRapoo,
  },
  {
    id: "microphone",
    category: "Microphone",
    brand: "MAONO",
    model: "PM422",
    spec: "Cardioid condenser · 192kHz/24-bit",
    specs: [
      { label: "Capsule", value: "16mm condenser" },
      { label: "Pattern", value: "Cardioid" },
      { label: "Resolution", value: "192kHz / 24-bit" },
      { label: "Frequency", value: "20Hz – 20kHz" },
      { label: "Max SPL", value: "125dB" },
      { label: "S/N ratio", value: "74dB" },
      { label: "Monitoring", value: "3.5mm, zero-latency" },
      { label: "Controls", value: "Touch mute, gain knob" },
      { label: "Connection", value: "USB-B, bus powered" },
    ],
    image: gearMaono,
  },
  {
    id: "speakers",
    category: "Speakers",
    brand: "EDIFIER",
    model: "R1000T4",
    spec: '2.0 active · 24W RMS · 4" drivers',
    specs: [
      { label: "Configuration", value: "2.0 active bookshelf" },
      { label: "Power", value: "24W RMS total (12W × 2)" },
      { label: "Bass driver", value: '4" mid/bass' },
      { label: "Tweeter", value: '0.5" silk dome' },
      { label: "Frequency", value: "75Hz – 18kHz (±9dB)" },
      { label: "S/N ratio", value: "≥85dBA" },
      { label: "Amplifier", value: "Class-D with DRC" },
      { label: "Inputs", value: "2 × RCA" },
      { label: "Enclosure", value: "MDF" },
    ],
    image: gearEdifier,
  },
  {
    id: "iem",
    category: "In-ear monitors",
    brand: "MOONDROP",
    model: "Aria 2",
    spec: "10mm dynamic · 33Ω · 16Hz–22kHz",
    specs: [
      { label: "Driver", value: "10mm dynamic" },
      { label: "Diaphragm", value: "TiN ceramic-coated dome composite" },
      { label: "Impedance", value: "33Ω ±15% @1kHz" },
      { label: "Sensitivity", value: "122dB/Vrms @1kHz" },
      { label: "Frequency", value: "16Hz – 22kHz" },
      { label: "THD", value: "≤0.05% @1kHz" },
      { label: "Connector", value: "0.78mm 2-pin" },
      { label: "Cable", value: "Silver-plated copper Litz" },
      { label: "Termination", value: "Modular 3.5mm + 4.4mm" },
      { label: "Housing", value: "Precision-milled alloy, brass nozzle" },
    ],
    image: gearMoondrop,
  },
  {
    id: "tools",
    category: "Tools",
    brand: "HOTO",
    model: "Precision Screwdriver Kit Pro",
    spec: "48-in-1 · S2 steel · dual torque",
    specs: [
      { label: "Accessories", value: "48 pieces" },
      { label: "Bits", value: "26 S2 steel (20 short, 6 long)" },
      { label: "Also included", value: "Spudgers, tweezers, suction cup, pry knife" },
      { label: "Torque", value: "0.05 / 0.2 N·m, two settings" },
      { label: "Light", value: "Circular LED, shadowless" },
      { label: "Charging", value: "USB-C, charge-in-case" },
      { label: "Runtime", value: "400+ screws per charge" },
      { label: "Case", value: "26mm thin, magnetic bit storage" },
    ],
    image: gearHoto,
  },
];

export default setup;
