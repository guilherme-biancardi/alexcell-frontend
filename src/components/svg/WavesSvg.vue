<template>
  <svg
    id="svg"
    viewBox="0 0 1440 390"
    xmlns="http://www.w3.org/2000/svg"
    class="transition duration-300 ease-in-out delay-150"
  >
    <defs>
      <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="5%" :stop-color="primary"></stop>
        <stop offset="95%" :stop-color="primaryDark"></stop>
      </linearGradient>
    </defs>
    <path
      d="M 0,400 C 0,400 0,133 0,133 C 89.51196172248802,147.3062200956938 179.02392344497605,161.61244019138758 283,170 C 386.97607655502395,178.38755980861242 505.4162679425838,180.85645933014354 607,175 C 708.5837320574162,169.14354066985646 793.311004784689,154.96172248803828 876,142 C 958.688995215311,129.03827751196172 1039.3397129186603,117.29665071770336 1133,116 C 1226.6602870813397,114.70334928229664 1333.3301435406697,123.85167464114832 1440,133 C 1440,133 1440,400 1440,400 Z"
      stroke="none"
      stroke-width="0"
      fill="url(#gradient)"
      fill-opacity="0.53"
      class="transition-all duration-300 ease-in-out delay-150 path-0"
    ></path>
    <defs>
      <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="5%" :stop-color="primary"></stop>
        <stop offset="95%" :stop-color="primaryDark"></stop>
      </linearGradient>
    </defs>
    <path
      d="M 0,400 C 0,400 0,266 0,266 C 114.76555023923447,249.99043062200957 229.53110047846894,233.98086124401917 310,235 C 390.46889952153106,236.01913875598083 436.6411483253588,254.06698564593296 532,275 C 627.3588516746412,295.93301435406704 771.9043062200958,319.75119617224885 878,309 C 984.0956937799042,298.24880382775115 1051.7416267942583,252.92822966507174 1139,240 C 1226.2583732057417,227.07177033492826 1333.129186602871,246.53588516746413 1440,266 C 1440,266 1440,400 1440,400 Z"
      stroke="none"
      stroke-width="0"
      fill="url(#gradient)"
      fill-opacity="1"
      class="transition-all duration-300 ease-in-out delay-150 path-1"
    ></path>
  </svg>
</template>

<script setup lang="ts">
import { useCssVar } from '@vueuse/core'

const primary = useCssVar('--primary')
const primaryDark = useCssVar('--primary-dark')
</script>

<style scoped></style>
