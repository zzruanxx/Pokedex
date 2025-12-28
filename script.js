async function searchPokemon() {
    const input = document.getElementById('pokemon-input').value.toLowerCase().trim();
    const infoDiv = document.getElementById('pokemon-info');
    const loading = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const image = document.getElementById('pokemon-image');
    const name = document.getElementById('pokemon-name');
    const types = document.getElementById('pokemon-types');
    const height = document.getElementById('pokemon-height');
    const weight = document.getElementById('pokemon-weight');
    const stats = document.getElementById('pokemon-stats');

    if (!input) {
        showError('Digite um nome ou ID válido.');
        return;
    }

    // Mostrar loading e esconder erro
    loading.style.display = 'block';
    errorDiv.style.display = 'none';
    infoDiv.style.display = 'block';

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
        if (!response.ok) throw new Error('Pokémon não encontrado.');

        const data = await response.json();

        // Preencher dados
        image.src = data.sprites.front_default;
        image.alt = `Imagem de ${data.name}`;
        name.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        types.textContent = `Tipos: ${data.types.map(t => t.type.name).join(', ')}`;
        height.textContent = `Altura: ${data.height / 10} m`;
        weight.textContent = `Peso: ${data.weight / 10} kg`;
        stats.innerHTML = data.stats.map(s => `<div>${s.stat.name}: ${s.base_stat}</div>`).join('');

        loading.style.display = 'none';
    } catch (error) {
        showError(error.message);
    }
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    const loading = document.getElementById('loading');
    const infoDiv = document.getElementById('pokemon-info');

    loading.style.display = 'none';
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    infoDiv.style.display = 'block';
}
