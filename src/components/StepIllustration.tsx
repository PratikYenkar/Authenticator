import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Rect, Circle, Path, G, Line, Text as SvgText, Defs, LinearGradient, Stop,
} from 'react-native-svg';

export type StepImageType =
  | 'open_settings'
  | 'navigate_security'
  | 'qr_scan'
  | 'enter_code'
  | 'backup_codes'
  | 'success';

const W = 320;
const H = 160;

// ─── Individual Illustrations ────────────────────────────────────────────────

function OpenSettings() {
  return (
    <Svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`}>
      {/* Background */}
      <Rect width={W} height={H} fill="#F0F4FF" rx={12} />

      {/* Phone frame */}
      <Rect x={100} y={14} width={120} height={132} rx={14} fill="#fff" stroke="#CBD5E1" strokeWidth={2} />
      {/* Status bar */}
      <Rect x={100} y={14} width={120} height={22} rx={14} fill="#E2E8F0" />
      <Circle cx={160} cy={25} r={4} fill="#94A3B8" />

      {/* Menu rows */}
      {/* Row 1 - Profile */}
      <Rect x={110} y={44} width={100} height={22} rx={6} fill="#F8FAFC" />
      <Circle cx={124} cy={55} r={6} fill="#94A3B8" />
      <Rect x={135} y={50} width={42} height={5} rx={2} fill="#CBD5E1" />
      <Rect x={135} y={58} width={28} height={4} rx={2} fill="#E2E8F0" />

      {/* Row 2 - Settings (HIGHLIGHTED) */}
      <Rect x={110} y={72} width={100} height={22} rx={6} fill="#EEF2FF" stroke="#6366F1" strokeWidth={1.5} />
      {/* Gear icon */}
      <Circle cx={124} cy={83} r={6} fill="#6366F1" />
      <Circle cx={124} cy={83} r={3} fill="#EEF2FF" />
      <Rect x={135} y={79} width={35} height={5} rx={2} fill="#6366F1" />
      <Rect x={135} y={87} width={22} height={4} rx={2} fill="#A5B4FC" />

      {/* Row 3 - Privacy */}
      <Rect x={110} y={100} width={100} height={22} rx={6} fill="#F8FAFC" />
      <Circle cx={124} cy={111} r={6} fill="#94A3B8" />
      <Rect x={135} y={106} width={38} height={5} rx={2} fill="#CBD5E1" />
      <Rect x={135} y={114} width={24} height={4} rx={2} fill="#E2E8F0" />

      {/* Row 4 - Help */}
      <Rect x={110} y={128} width={100} height={12} rx={4} fill="#F1F5F9" />
      <Rect x={118} y={132} width={44} height={4} rx={2} fill="#E2E8F0" />

      {/* Tap indicator arrow */}
      <Path d="M80 83 L100 83" stroke="#6366F1" strokeWidth={2} strokeDasharray="4,3"
        fill="none" />
      <Path d="M96 79 L102 83 L96 87" fill="#6366F1" />
      <SvgText x={58} y={80} textAnchor="middle" fill="#6366F1" fontSize={10} fontWeight="bold">TAP</SvgText>
      <SvgText x={58} y={92} textAnchor="middle" fill="#6366F1" fontSize={10} fontWeight="bold">HERE</SvgText>
    </Svg>
  );
}

function NavigateSecurity() {
  return (
    <Svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="#F0FDF4" rx={12} />

      {/* Breadcrumb path */}
      {/* Step 1 - Settings */}
      <Rect x={12} y={62} width={72} height={36} rx={8} fill="#fff" stroke="#CBD5E1" strokeWidth={1.5} />
      <SvgText x={48} y={76} textAnchor="middle" fill="#475569" fontSize={9} fontWeight="600">Settings</SvgText>
      <SvgText x={48} y={90} textAnchor="middle" fill="#94A3B8" fontSize={8}>menu</SvgText>

      {/* Arrow 1 */}
      <Path d="M88 80 L102 80" stroke="#94A3B8" strokeWidth={2} fill="none" />
      <Path d="M98 76 L104 80 L98 84" fill="#94A3B8" />

      {/* Step 2 - Security */}
      <Rect x={106} y={62} width={72} height={36} rx={8} fill="#fff" stroke="#CBD5E1" strokeWidth={1.5} />
      <SvgText x={142} y={76} textAnchor="middle" fill="#475569" fontSize={9} fontWeight="600">Security</SvgText>
      <SvgText x={142} y={90} textAnchor="middle" fill="#94A3B8" fontSize={8}>& Login</SvgText>

      {/* Arrow 2 */}
      <Path d="M182 80 L196 80" stroke="#94A3B8" strokeWidth={2} fill="none" />
      <Path d="M192 76 L198 80 L192 84" fill="#94A3B8" />

      {/* Step 3 - 2FA (highlighted) */}
      <Rect x={200} y={55} width={108} height={50} rx={8} fill="#DCFCE7" stroke="#22C55E" strokeWidth={2} />
      {/* Shield icon */}
      <Path d="M228 70 C228 70 224 68 224 64 L224 58 L232 56 L240 58 L240 64 C240 68 236 70 232 70 Z"
        fill="#22C55E" />
      <Path d="M229 63 L231 65 L235 61" stroke="#fff" strokeWidth={2} strokeLinecap="round"
        strokeLinejoin="round" fill="none" />
      <SvgText x={248} y={74} fill="#15803D" fontSize={9} fontWeight="700">Two-Factor</SvgText>
      <SvgText x={248} y={86} fill="#15803D" fontSize={9} fontWeight="700">Auth</SvgText>

      {/* Label */}
      <SvgText x={W / 2} y={130} textAnchor="middle" fill="#64748B" fontSize={11}>
        Navigate to Security settings
      </SvgText>
    </Svg>
  );
}

function QRScan() {
  // Simple QR code grid
  const cellSize = 8;
  const qrData = [
    [1,1,1,0,1,1,1],
    [1,0,1,0,1,0,1],
    [1,1,1,0,1,1,1],
    [0,0,0,0,0,0,0],
    [1,1,1,0,1,1,1],
    [1,0,1,0,0,0,1],
    [1,1,1,0,1,1,1],
  ];

  return (
    <Svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="#EFF6FF" rx={12} />

      {/* QR Code box */}
      <Rect x={24} y={24} width={80} height={80} rx={8} fill="#fff" stroke="#BFDBFE" strokeWidth={2} />
      {qrData.map((row, ri) =>
        row.map((cell, ci) =>
          cell ? (
            <Rect
              key={`${ri}-${ci}`}
              x={30 + ci * cellSize}
              y={30 + ri * cellSize}
              width={cellSize - 1}
              height={cellSize - 1}
              rx={1}
              fill="#1E3A8A"
            />
          ) : null
        )
      )}

      {/* Arrow */}
      <Path d="M112 64 L148 64" stroke="#3B82F6" strokeWidth={2.5} fill="none" />
      <Path d="M144 59 L150 64 L144 69" fill="#3B82F6" />

      {/* Phone */}
      <Rect x={152} y={20} width={76} height={120} rx={12} fill="#fff" stroke="#CBD5E1" strokeWidth={2} />
      <Rect x={157} y={30} width={66} height={92} rx={6} fill="#DBEAFE" />
      {/* Camera viewfinder */}
      <Rect x={167} y={40} width={46} height={46} rx={4} fill="none" stroke="#3B82F6" strokeWidth={2} />
      {/* Corner marks */}
      <Path d="M167 52 L167 40 L179 40" stroke="#1D4ED8" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <Path d="M201 40 L213 40 L213 52" stroke="#1D4ED8" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <Path d="M167 74 L167 86 L179 86" stroke="#1D4ED8" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <Path d="M201 86 L213 86 L213 74" stroke="#1D4ED8" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Scan line */}
      <Line x1={169} y1={63} x2={211} y2={63} stroke="#3B82F6" strokeWidth={1.5} strokeDasharray="4,2" />
      {/* Home bar */}
      <Rect x={175} y={130} width={30} height={4} rx={2} fill="#CBD5E1" />

      {/* Labels */}
      <SvgText x={64} y={118} textAnchor="middle" fill="#1D4ED8" fontSize={10} fontWeight="600">QR Code</SvgText>
      <SvgText x={190} y={118} textAnchor="middle" fill="#1D4ED8" fontSize={10} fontWeight="600">Scan</SvgText>

      {/* Instruction */}
      <SvgText x={W / 2} y={152} textAnchor="middle" fill="#64748B" fontSize={10}>
        Point camera at the QR code on screen
      </SvgText>
    </Svg>
  );
}

function EnterCode() {
  const digits = ['4', '2', '7', '•', '•', '•'];
  const boxW = 36, boxH = 44, gap = 8;
  const totalW = 6 * boxW + 5 * gap;
  const startX = (W - totalW) / 2;

  return (
    <Svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="#FDF4FF" rx={12} />

      {/* Title */}
      <SvgText x={W / 2} y={32} textAnchor="middle" fill="#7E22CE" fontSize={13} fontWeight="700">
        Enter 6-Digit Code
      </SvgText>

      {/* Code boxes */}
      {digits.map((d, i) => {
        const x = startX + i * (boxW + gap);
        const filled = d !== '•';
        return (
          <G key={i}>
            <Rect
              x={x} y={46} width={boxW} height={boxH} rx={8}
              fill={filled ? '#F3E8FF' : '#fff'}
              stroke={filled ? '#A855F7' : '#E2E8F0'}
              strokeWidth={filled ? 2 : 1.5}
            />
            <SvgText
              x={x + boxW / 2} y={76}
              textAnchor="middle"
              fill={filled ? '#7E22CE' : '#CBD5E1'}
              fontSize={filled ? 22 : 18}
              fontWeight="bold"
            >
              {d}
            </SvgText>
          </G>
        );
      })}

      {/* Gap between 3rd and 4th box */}
      <SvgText
        x={startX + 3 * (boxW + gap) - gap / 2 - 4} y={72}
        fill="#94A3B8" fontSize={14} fontWeight="bold"
      > </SvgText>

      {/* Refresh note */}
      <SvgText x={W / 2} y={114} textAnchor="middle" fill="#9333EA" fontSize={10}>
        Code refreshes every 30 seconds
      </SvgText>
      {/* Clock icon indicator */}
      <Circle cx={W / 2 - 50} cy={130} r={10} fill="none" stroke="#C084FC" strokeWidth={1.5} />
      <Line x1={W / 2 - 50} y1={124} x2={W / 2 - 50} y2={130} stroke="#C084FC" strokeWidth={1.5} strokeLinecap="round" />
      <Line x1={W / 2 - 50} y1={130} x2={W / 2 - 45} y2={130} stroke="#C084FC" strokeWidth={1.5} strokeLinecap="round" />
      <SvgText x={W / 2 - 34} y={134} fill="#94A3B8" fontSize={9}>tap code in app to copy</SvgText>
    </Svg>
  );
}

function BackupCodes() {
  const codeLines = [
    '8f3a-2b91', 'c7e4-9d05', '1a6f-4c82',
    '5d3b-7e19', '2c8a-6f34',
  ];
  return (
    <Svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="#FFFBEB" rx={12} />

      {/* Card */}
      <Rect x={48} y={12} width={224} height={116} rx={10} fill="#fff"
        stroke="#FCD34D" strokeWidth={2} />
      {/* Card header */}
      <Rect x={48} y={12} width={224} height={28} rx={10} fill="#FEF3C7" />
      <Rect x={48} y={30} width={224} height={10} rx={0} fill="#FEF3C7" />

      {/* Lock icon in header */}
      <Path d="M148 18 L148 22 A4 4 0 0 0 156 22 L156 18 A4 4 0 0 0 148 18 Z"
        fill="none" stroke="#D97706" strokeWidth={1.5} />
      <Rect x={147} y={22} width={10} height={8} rx={2} fill="#D97706" />
      <SvgText x={166} y={31} fill="#92400E" fontSize={11} fontWeight="700">Backup Codes</SvgText>

      {/* Code lines */}
      {codeLines.map((code, i) => (
        <G key={i}>
          <Rect x={62} y={46 + i * 15} width={14} height={8} rx={2} fill="#FCD34D" />
          <SvgText x={82} y={54 + i * 15} fill="#78350F" fontSize={10} fontWeight="600">
            {code}
          </SvgText>
          {/* Used X for first one */}
          {i === 0 && (
            <Path d="M244 47 L252 55 M252 47 L244 55" stroke="#EF4444" strokeWidth={2}
              strokeLinecap="round" />
          )}
        </G>
      ))}

      {/* Warning */}
      <SvgText x={W / 2} y={144} textAnchor="middle" fill="#92400E" fontSize={10} fontWeight="600">
        Save these! Each code can only be used once.
      </SvgText>
    </Svg>
  );
}

function Success() {
  return (
    <Svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`}>
      <Defs>
        <LinearGradient id="successGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#DCFCE7" />
          <Stop offset="1" stopColor="#BBF7D0" />
        </LinearGradient>
      </Defs>
      <Rect width={W} height={H} fill="url(#successGrad)" rx={12} />

      {/* Big checkmark circle */}
      <Circle cx={W / 2} cy={68} r={40} fill="#22C55E" />
      <Circle cx={W / 2} cy={68} r={34} fill="#16A34A" />
      <Path
        d={`M${W / 2 - 16} 68 L${W / 2 - 4} 80 L${W / 2 + 18} 54`}
        stroke="#fff"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Sparkle dots */}
      {[
        { x: 68, y: 32, r: 4 }, { x: 252, y: 36, r: 4 },
        { x: 52, y: 90, r: 3 }, { x: 268, y: 94, r: 3 },
        { x: 84, y: 120, r: 3 }, { x: 240, y: 118, r: 3 },
      ].map((dot, i) => (
        <Circle key={i} cx={dot.x} cy={dot.y} r={dot.r} fill="#4ADE80" />
      ))}

      <SvgText x={W / 2} y={128} textAnchor="middle" fill="#15803D" fontSize={16} fontWeight="bold">
        2FA is Active!
      </SvgText>
      <SvgText x={W / 2} y={148} textAnchor="middle" fill="#16A34A" fontSize={10}>
        Your account is now protected
      </SvgText>
    </Svg>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function StepIllustration({ type }: { type: StepImageType }) {
  return (
    <View style={styles.container}>
      {type === 'open_settings'     && <OpenSettings />}
      {type === 'navigate_security' && <NavigateSecurity />}
      {type === 'qr_scan'           && <QRScan />}
      {type === 'enter_code'        && <EnterCode />}
      {type === 'backup_codes'      && <BackupCodes />}
      {type === 'success'           && <Success />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginLeft: 34,
    borderRadius: 12,
    overflow: 'hidden',
  },
});
