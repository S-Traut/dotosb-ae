export function applyTransform(sprite, transform) {
  sprite.origin = transform.origin;
  fadeTransform(sprite, transform.fade);
  positionTransform(sprite, transform.position);
  scaleTransform(sprite, transform.scale);
  rotationTransform(sprite, transform.rotation);
}

function fadeTransform(sprite, values) {
  if(!values || values.length == 0) return;

  const tweens = tweenValues(values);
  for(const tween of tweens) {
    sprite.add('F', tween.t, tween.v, tween.e);
  }
}

function rotationTransform(sprite, values) {
  if(!values || values.length == 0) return;
  
  const tweens = tweenValues(values);
  for(const tween of tweens) {
    sprite.add('R', tween.t, tween.v, tween.e);
  }
}

function positionTransform(sprite, values) {
  if(!values || values.length == 0) return;
  
  for(const tween of tweenValues(values.x))
      sprite.add('MX', tween.t, tween.v, tween.e);

  for(const tween of tweenValues(values.y))
      sprite.add('MY', tween.t, tween.v, tween.e);
}

function scaleTransform(sprite, values) {
  if(!values || values.length == 0) return;

  const x_tweens = tweenValues(values.x);
  const y_tweens = tweenValues(values.y);

  for(let i = 0; i < x_tweens.length; i++) {
    const xt = x_tweens[i];
    const yt = y_tweens[i];
    const tween = {
      t: xt.t,
      v: [...xt.v, ...yt.v],
      e: xt.e,
    };
    sprite.add('V', tween.t, tween.v, tween.e);
  }
}

function tweenValues(values) {
  
  const output = [];
  let old = undefined;
  let couple = {t: [], v: []};

  for(const current of values) {
    if(!old) {
      old = current;
      continue;
    }

    // (TODO) Add optimizations
    couple.t[0] = old.time;
    couple.t[1] = current.time;
    couple.v[0] = old.value;
    couple.v[1] = current.value; 
   
    // (TODO) Easing conversion 
    if(old.easing != 'None')
      couple.e = 0;

    output.push(couple);
    couple = {t: [], v: []};
    old = current;
  } 
  return output;
}
