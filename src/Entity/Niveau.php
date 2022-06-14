<?php

namespace App\Entity;

use App\Repository\NiveauRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;

use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints\Choice;

/**
 * @ORM\Entity(repositoryClass=NiveauRepository::class)
 * @ApiResource(
 *     attributes={
 *     "pagination_enabled"=true,
 *     "order": {"code"="desc"}
 *     },
 *     normalizationContext={"groups"={"niveau_read"}},
 *     denormalizationContext={"disable_type_enforcement"=true}
 * )
 * @ApiFilter(SearchFilter::class, properties={"name":"partial"})
 */
class Niveau
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"niveau_read", "users_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"niveau_read", "users_read"})
     * @Assert\NotBlank(message="code is required")
     * @Assert\Length(
     *      min = 1,
     *      max = 10000,
     *      minMessage = "code must be at least 1 digits long",
     *      maxMessage = "code cannot be longer than 1000 digits"
     * )
     */
    private $code;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"niveau_read", "users_read"})
     * @Assert\NotBlank(message="name is required")
     * @Assert\Length(
     *      min = 3,
     *      max = 1000,
     *      minMessage = "name must be at least 3 digits long",
     *      maxMessage = "name cannot be longer than 1000 digits"
     * )
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity=Module::class, inversedBy="niveaux")
     * @Groups({"niveau_read"})
     */
    private $module;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCode(): ?int
    {
        return $this->code;
    }

    public function setCode(?int $code): self
    {
        $this->code = $code;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getModule(): ?Module
    {
        return $this->module;
    }

    public function setModule(?Module $module): self
    {
        $this->module = $module;

        return $this;
    }
}
