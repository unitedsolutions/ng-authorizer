export default function() {
  ['remover', 'changer'].forEach(type => this[type].complete());  
}
