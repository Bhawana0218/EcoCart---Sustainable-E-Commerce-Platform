const calculateImpact = (product) => {

  let plasticSaved = 0;
  let carbonSaved = 0;

  // simple sustainability logic
  if (product.material && product.material.toLowerCase().includes("bamboo")) {
    plasticSaved = 0.5;
    carbonSaved = 1.2;
  }

  if (product.material && product.material.toLowerCase().includes("recycled")) {
    plasticSaved = 0.7;
    carbonSaved = 1.5;
  }

  if (product.material && product.material.toLowerCase().includes("paper")) {
    plasticSaved = 0.3;
    carbonSaved = 0.8;
  }

  const statement = `This purchase helped avoid ${plasticSaved}kg of plastic and reduced carbon emissions by ${carbonSaved}kg. Thank you for choosing sustainable products!`;

  return {
    plasticSaved,
    carbonSaved,
    impactStatement: statement
  };

};

export default  calculateImpact;