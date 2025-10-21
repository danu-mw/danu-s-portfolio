// Cloudflare Environment Variables Test
// Paste this in browser console (F12) on your Cloudflare site

console.log('🔍 Checking Environment Variables...\n');

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

console.log('Expected Values:');
console.log('  Service ID:  service_0055iu');
console.log('  Template ID: template_72vsqv7');
console.log('  Public Key:  N97w_YfvEQpPJUBPU');
console.log('\nActual Values:');
console.log('  Service ID: ', serviceId || '❌ UNDEFINED');
console.log('  Template ID:', templateId || '❌ UNDEFINED');
console.log('  Public Key: ', publicKey || '❌ UNDEFINED');

if (serviceId && templateId && publicKey) {
  console.log('\n✅ ALL VARIABLES LOADED!');
  console.log('Contact form should work!');
  
  // Check if values match
  const correctService = serviceId === 'service_0055iu';
  const correctTemplate = templateId === 'template_72vsqv7';
  const correctKey = publicKey === 'N97w_YfvEQpPJUBPU';
  
  if (correctService && correctTemplate && correctKey) {
    console.log('✅ All values are CORRECT!');
  } else {
    console.log('⚠️  VALUES DO NOT MATCH EXPECTED!');
    if (!correctService) console.log('❌ Service ID is wrong');
    if (!correctTemplate) console.log('❌ Template ID is wrong');
    if (!correctKey) console.log('❌ Public Key is wrong');
  }
} else {
  console.log('\n❌ VARIABLES NOT LOADED!');
  console.log('\nPossible reasons:');
  console.log('1. Variables not set in Cloudflare dashboard');
  console.log('2. "Production" not checked in Cloudflare');
  console.log('3. Build did not include variables (need rebuild)');
  console.log('4. Variable names do not match exactly');
  console.log('\nFix:');
  console.log('1. Go to Cloudflare Dashboard');
  console.log('2. Settings → Environment Variables');
  console.log('3. Add/verify all 3 variables');
  console.log('4. Check "Production" for each');
  console.log('5. Trigger new deployment');
}
