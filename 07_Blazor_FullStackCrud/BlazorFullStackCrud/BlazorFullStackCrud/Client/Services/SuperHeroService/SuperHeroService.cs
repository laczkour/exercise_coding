using System.Net.Http.Json;
using BlazorFullStackCrud.Shared;

namespace BlazorFullStackCrud.Client.Services.SuperHeroService
{
    public class SuperHeroService : ISuperHeroService
    {
        private readonly HttpClient _http;

        public SuperHeroService(HttpClient http)
        {
            _http = http;
        }

        public List<SuperHero> Heroes { get; set; } = new List<SuperHero>();

        public List<Comic> Comics { get; set; } = new List<Comic>();
        
        public Task GetComics()
        {
            throw new NotImplementedException();
        }

        public async Task GetSuperHeroes()
        {
            var result = await _http.GetFromJsonAsync<List<SuperHero>>("api/SuperHero");

            if (result is not null)
            {
                Heroes = result;
            }
        }

        public Task<SuperHero> GetSingleHero(int id)
        {
            throw new NotImplementedException();
        }
    }
}
