import localsRepository from "@/repositories/locals-repository";

async function get() {
  const locals = await localsRepository.findLocals();
  return locals;
}

const localsService = {
  get,
};

export default localsService;
